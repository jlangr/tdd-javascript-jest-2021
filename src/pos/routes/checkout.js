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

const round = total => Math.round(total * 100) / 100

const formatAsPrice = price => parseFloat(round(price).toString()).toFixed(2)

const createLineItem = (price, description) => {
  const amount = formatAsPrice(price)
  const amountWidth = amount.length
  const textWidth = LineWidth - amountWidth
  return pad(description, textWidth) + amount
}

const shouldBeDiscounted = (item, memberDiscountPercent) => !item.exempt && memberDiscountPercent > 0

const send = (response, result, status = 200) => {
  response.status = status
  response.send(result)
}

const sendError = (response, message, status = 400) =>
  send(response, {error: message}, status)

const memberDiscountPercent = checkout =>
  checkout.member ? checkout.discount : 0

const calculateTotalOfItemPrices = (checkout) => {
  let totalOfItemPrices = 0
  checkout.items.forEach(item => {
    if (shouldBeDiscounted(item, memberDiscountPercent(checkout)))
      totalOfItemPrices += item.price * (1.0 - memberDiscountPercent(checkout))
    else
      totalOfItemPrices += item.price
  })
  return totalOfItemPrices
}

const calculateTotalSavedFromDiscounts = checkout =>
  discountableItems(checkout).reduce((total, item) =>
    total + memberDiscountPercent(checkout) * item.price,
  0)

// const calculateTotalOfDiscountedItems = checkout => {
//   let totalOfDiscountedItems = 0
//   checkout.items.forEach(item => {
//     if (shouldBeDiscounted(item, memberDiscountPercent(checkout))) {
//       const discountedPrice = item.price * (1.0 - memberDiscountPercent(checkout))
//       totalOfDiscountedItems += discountedPrice
//     }
//   })
//   return totalOfDiscountedItems
// }

const discountableItems = checkout =>
  checkout.items.filter(item => shouldBeDiscounted(item, memberDiscountPercent(checkout)));

const calculateTotalOfDiscountedItems = checkout =>
  discountableItems(checkout).reduce((total, item) =>
    total + item.price * (1.0 - memberDiscountPercent(checkout)),
  0)

const discountedItemAmount = (checkout, item) =>
  memberDiscountPercent(checkout) * item.price

const createReceipt = (checkout, totals) => {
  const messages = []
  checkout.items.forEach(item => {
    messages.push(createLineItem(item.price, item.description))
    if (shouldBeDiscounted(item, memberDiscountPercent(checkout)))
      messages.push(createLineItem(-discountedItemAmount(checkout, item), `   ${memberDiscountPercent(checkout) * 100}% mbr disc`))
  })
  messages.push(createLineItem(round(totals.totalOfItemPrices), 'TOTAL'))
  if (totals.totalSavedFromDiscounts > 0)
    messages.push(createLineItem(totals.totalSavedFromDiscounts, '*** You saved:'))
  return messages;
}

const calculateTotals = checkout => ({
  totalOfItemPrices: calculateTotalOfItemPrices(checkout),
  totalSavedFromDiscounts: calculateTotalSavedFromDiscounts(checkout),
  totalOfDiscountedItems: calculateTotalOfDiscountedItems(checkout)
})

export const postCheckoutTotal = (request, response) => {
  const checkoutId = request.params.id
  const checkout = Checkouts.retrieve(checkoutId)
  if (!checkout)
    return sendError(response, 'nonexistent checkout')

  const totals = calculateTotals(checkout);

  send(response, {
    id: checkoutId,
    messages: createReceipt(checkout, totals),
    total: round(totals.totalOfItemPrices),
    totalOfDiscountedItems: round(totals.totalOfDiscountedItems),
    totalSaved: round(totals.totalSavedFromDiscounts)
  })
}
