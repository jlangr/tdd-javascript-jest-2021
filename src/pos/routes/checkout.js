import * as Members from '../data/member_database'
import {retrieveItem} from '../data/item_database'
import * as Checkouts from '../data/checkouts'
import {pad} from '../../util/stringutil'

const sendRequestError = (response, message) => {
  response.status = 400
  response.send({error: message})
}

const sendResponse = (response, body, status = 200) => {
  response.status = status
  response.send(body)
}

const sendSuccessResponse = (response, body) => {
  response.status = 200
  response.send(body)
}

export const clearAllCheckouts = (_, __) => Checkouts.deleteAll()

export const getCheckout = (request, response) =>
  response.send(Checkouts.retrieve(request.params.id))

export const getCheckouts = (_, response) =>
  response.send(Checkouts.retrieveAll())

export const postCheckout = (_, response) =>
  sendResponse(response, Checkouts.createNew(), 201)

export const getItems = (request, response) => {
  const checkout = Checkouts.retrieve(request.params.id)
  response.send(checkout.items)
}

const attachMemberToCheckout = (checkoutId, memberId) => {
  const member = Members.retrieveMember(memberId)
  if (!member) return 'unrecognized member'

  const checkout = Checkouts.retrieve(checkoutId)
  if (!checkout) return 'invalid checkout'

  Object.assign(checkout, member)

  Checkouts.updateCheckout(checkoutId, checkout)
}

export const postMember = (request, response) => {
  const memberId = request.body.id
  const checkoutId = request.params.id
  const errorMessage = attachMemberToCheckout(checkoutId, memberId)
  if (errorMessage)
    return sendRequestError(response, errorMessage)

  sendResponse(response, Checkouts.retrieve(checkoutId))
}

export const postItem = (request, response) => {
  const itemDetails = retrieveItem(request.body.upc)
  if (!itemDetails)
    return sendRequestError(response, 'unrecognized UPC code')

  const checkout = Checkouts.retrieve(request.params.id)
  if (!checkout)
    return sendRequestError(response, 'nonexistent checkout')

  const newCheckoutItem = Checkouts.addItem(checkout, itemDetails)

  sendResponse(response, newCheckoutItem, 201)
}

const LineWidth = 45

const formatTotal = dollarAmount => parseFloat(round2(dollarAmount).toString()).toFixed(2)

const createLineItem = (dollarAmount, description) => {
  const formattedTotal = formatTotal(dollarAmount)
  const formattedTotalWidth = formattedTotal.length
  const textWidth = LineWidth - formattedTotalWidth
  return pad(description, textWidth) + formattedTotal;
}

const round2 = amount => Math.round(amount * 100) / 100

const memberDiscountPercent = checkout => checkout.member ? checkout.discount : 0

const sendErrorResponse = (response, errorMessage = 'nonexistent checkout') => {
  response.status = 400
  response.send({error: errorMessage})
}

const shouldDiscountItem = (item, checkout) =>
 !item.exempt && memberDiscountPercent(checkout) > 0

const discountedPrice = (item, checkout) => item.price * (1.0 - memberDiscountPercent(checkout))

function memberDiscountDescription(checkout) {
  return `   ${memberDiscountPercent(checkout) * 100}% mbr disc`;
}

const calculateTotalDiscountItems = checkout =>
  checkout.items
    .filter(item => shouldDiscountItem(item, checkout))
    .reduce((total, item) => total + discountedPrice(item, checkout), 0)

const calculateTotalSaved = checkout => {
  let totalSaved = 0
  checkout.items.forEach(item => {
    if (shouldDiscountItem(item, checkout)) {
      totalSaved += memberDiscountPercent(checkout) * item.price
    }
  })
  return totalSaved
}

const calculateTotal = checkout => {
  let total = 0
  checkout.items.forEach(item => {
    if (shouldDiscountItem(item, checkout))
      total += discountedPrice(item, checkout)
    else
      total += item.price
  })
  return total
}

const calculateTotals = checkout => ({
  totalSaved: calculateTotalSaved(checkout),
  total: calculateTotal(checkout),
  totalOfDiscountedItems: calculateTotalDiscountItems(checkout)
})

const gatherLineItems = (checkout, total, totalSaved) => {
  const messages = []

  checkout.items.forEach(item => {
    messages.push(createLineItem(item.price, item.description))
    if (shouldDiscountItem(item, checkout))
      messages.push(createLineItem(-(memberDiscountPercent(checkout) * item.price), memberDiscountDescription(checkout)))
  })

  messages.push(createLineItem(round2(total), 'TOTAL'))
  if (totalSaved > 0)
    messages.push(createLineItem(totalSaved, '*** You saved:'))

  return messages;
}

const gatherCheckoutDetails = checkout => {
  const { total, totalSaved, totalOfDiscountedItems } = calculateTotals(checkout)
  const messages = gatherLineItems(checkout, total, totalSaved);
  return { messages, total, totalSaved, totalOfDiscountedItems }
}

export const postCheckoutTotal = (request, response) => {
  const checkout = Checkouts.retrieve(request.params.id)
  if (!checkout) return sendErrorResponse(response)

  const { messages,  total, totalOfDiscountedItems, totalSaved } = gatherCheckoutDetails(checkout)

  sendSuccessResponse(response, {
    id: checkout.id,
    total: round2(total),
    totalOfDiscountedItems: round2(totalOfDiscountedItems),
    totalSaved: round2(totalSaved),
    messages,
  })
}
