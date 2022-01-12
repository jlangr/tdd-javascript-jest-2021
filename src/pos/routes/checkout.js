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

const floatToFixed = (amount) => Math.round(amount * 100) / 100

const formatPrice = (price)=> floatToFixed(price).toFixed(2)
const discountAmount = (discount, price) => discount * price
const discountedPrice = (discount, price) => price * (1.0 - discount)

const pushMessage = (messages, text, price) => {
  const amount = formatPrice(price)
  const amountWidth = amount.length

  const textWidth = LineWidth - amountWidth
  messages.push(pad(text, textWidth) + amount)
}

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
    const { price, exempt: isExempt , description} = item
    if (!isExempt && discount > 0) {
			
			// add into total
      totalOfDiscountedItems += discountedPrice(discount, price)
			
      pushMessage(messages, description, price)
      // format percent
      // const amount = formatPrice(price)
      // const amountWidth = amount.length

      // let textWidth = LineWidth - amountWidth
      // messages.push(pad(text, textWidth) + amount)

      total += discountedPrice(discount, price)

      // discount line
      const discountFormatted = '-' + formatPrice(discountAmount(discount, price))
      const textWidth = LineWidth - discountFormatted.length
      const text = `   ${discount * 100}% mbr disc`
      messages.push(`${pad(text, textWidth)}${discountFormatted}`)

      totalSaved += discountAmount(discount, price)
    }
    else {
      total += price
      pushMessage(messages, description, price)
    }
  })
  total = floatToFixed(total)

  // append total line
	pushMessage(messages, 'TOTAL', total)

  if (totalSaved > 0) {
		pushMessage(messages, '*** You saved:', totalSaved)
  }

  totalOfDiscountedItems = floatToFixed(totalOfDiscountedItems)

  totalSaved = floatToFixed(totalSaved)

  response.status = 200
  // send total saved instead
  response.send({ id: checkoutId, total, totalOfDiscountedItems, messages, totalSaved })
}
