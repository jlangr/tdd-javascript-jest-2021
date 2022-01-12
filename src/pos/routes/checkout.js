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

export const postCheckoutTotal = (request, response) => {
  const checkoutId = request.params.id
  const checkout = Checkouts.retrieve(checkoutId)
  if (!checkout) {
    response.status = 400
    response.send({error: 'nonexistent checkout'})
    return
  }

  const messages = []
  const discount = checkout.member ? checkout.discount : 0

  let totalOfDiscountedItems = 0
  let total = 0
  let totalSaved = 0

  checkout.items.forEach(item => {
    let price = item.price
    const isExempt = item.exempt
    messages.push(formatReceiptEntry(price, item.description))

    if (!isExempt && discount > 0) {
      const discountAmount = discount * price
      const discountedPrice = price * (1.0 - discount)

      totalOfDiscountedItems += discountedPrice
      total += discountedPrice
      totalSaved += discountAmount
      
      messages.push(formatReceiptEntry(discountAmount*-1, `   ${discount * 100}% mbr disc`))

    }
    else {
      total += price
    }
  })

  messages.push(formatReceiptEntry(total, 'TOTAL'))

  if (totalSaved > 0) {
    messages.push(formatReceiptEntry(totalSaved, '*** You saved:'))
  }

  totalOfDiscountedItems = roundTwoDecimalPlaces(totalOfDiscountedItems)
  totalSaved = roundTwoDecimalPlaces(totalSaved)

  response.status = 200
  // send total saved instead
  response.send({ id: checkoutId, total: roundTwoDecimalPlaces(total), totalOfDiscountedItems, messages, totalSaved })
}

const roundTwoDecimalPlaces = (amount) => Math.round(amount * 100) / 100

const formatTwoDecimalPlaces = (amount) => parseFloat(amount.toString()).toFixed(2)

const formatAmount = (amount) => formatTwoDecimalPlaces(roundTwoDecimalPlaces(amount))

const formatReceiptEntry = (amount, linePrefix) => {
  const formattedTotal = formatAmount(amount)
  const formattedTotalWidth = formattedTotal.length
  const textWidth = LineWidth - formattedTotalWidth
  return pad(linePrefix, textWidth) + formattedTotal
}