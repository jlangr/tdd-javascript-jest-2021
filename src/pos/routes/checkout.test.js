import {
  clearAllCheckouts,
  getCheckout,
  getCheckouts,
  postCheckout,
  postCheckoutTotal,
  postItem,
  postMember
} from './checkout'

import IncrementingIdGenerator from '../data/incrementing-id-generator'
import {overrideRetrieveItem} from '../data/item_database'
import {overrideRetrieveMember} from '../data/member_database'

const initializeTrackingResponse = () => ({
  send: jest.fn(),
  status: undefined
})

const expectResponseToEqual = (response, expected) =>
  expect(response.send).toHaveBeenCalledWith(expected)

const expectResponseToMatch = (response, expected) => {
  const firstCallFirstArg = response.send.mock.calls[0][0]
  expect(firstCallFirstArg).toMatchObject(expected)
}

const postNewCheckoutWithId = (id, response) => {
  IncrementingIdGenerator.reset(id)
  postCheckout({}, response)
}

// TODO: add item before checkout initiated--creates checkout
// TODO: identify member before checkout initiated creates checkout

describe('checkout routes', () => {
  let response
  const checkoutId = 1001

  beforeEach(() => {
    clearAllCheckouts()
    response = initializeTrackingResponse()
    postNewCheckoutWithId(checkoutId, response)
  })

  describe('checkouts', () => {
    it('returns created checkout on post', () => {
      expectResponseToEqual(response, { id: checkoutId, items: [] })
      expect(response.status).toEqual(201)
    })

    it('returns persisted checkout on get', () => {
      getCheckout({ params: { id: checkoutId }}, response)

      expectResponseToEqual(response, { id: checkoutId, items: [] })
    })

    it('returns additionally created checkouts on get all', () => {
      postCheckout({}, response)

      getCheckouts({}, response)

      expectResponseToEqual(response,
        [{ id: checkoutId, items: [] }, { id: checkoutId + 1, items: [] }])
    })
  })

  describe('items', () => {
    it('returns created item on post', () => {
      overrideRetrieveItem(() => ({ upc: '333', description: 'Milk', price: 3.33 }))
      IncrementingIdGenerator.reset(1002)

      postItem({ params: { id: checkoutId }, body: { upc: '333' } }, response)

      expect(response.status).toEqual(201)
      expectResponseToEqual(response, { id: 1002, upc: '333', description: 'Milk', price: 3.33 })
    })

    it('returns error when item UPC not found', () => {
      overrideRetrieveItem(() => undefined)

      postItem({ params: { id: checkoutId }, body: { upc: '333' } }, response)

      expect(response.status).toEqual(400)
      expectResponseToEqual(response, { error: 'unrecognized UPC code' })
    })

    it('returns error when checkout not found', () => {
      overrideRetrieveItem(() => ({ upc: '333', description: '', price: 0.00 }))

      postItem({ params: { id: -1 }, body: { upc: '333' } }, response)

      expect(response.status).toEqual(400)
      expectResponseToEqual(response, { error: 'nonexistent checkout' })
    })
  })

  describe('scanning a member ID', () => {
    it('updates checkout with member data', () => {
      overrideRetrieveMember(() => ({ member: '719-287-4335', discount: 0.01, name: 'Jeff Languid' }))
      postMember({ params: { id: checkoutId }, body: { id: '719-287-4335' }}, response)
      response = initializeTrackingResponse()

      getCheckout({params: { id: checkoutId }}, response)

      expectResponseToMatch(response, { member: '719-287-4335', discount: 0.01, name: 'Jeff Languid' })
    })

    it('returns error when checkout not found', () => {
      postMember({ params: { id: 999 }, body: { id: 'unknown' }}, response)

      expect(response.status).toEqual(400)
      expectResponseToEqual(response, { error: 'invalid checkout' })
    })

    it('returns error when member not found', () => {
      overrideRetrieveMember(() => undefined)

      postMember({ params: { id: checkoutId }, body: { id: 'anything' }}, response)

      expect(response.status).toEqual(400)
      expectResponseToEqual(response, { error: 'unrecognized member' })
    })
  })

  const purchaseItem = (upc, price, description, exempt = false) => {
    overrideRetrieveItem(upc => ({ upc, price, description, exempt }))
    const response = initializeTrackingResponse()
    postItem({ params: { id: checkoutId }, body: { upc } }, response)
  }

  const purchaseExemptItem = (upc, price, description='') => {
    purchaseItem(upc, price, description, true)
  }

  const purchase = (upc, price, description='') => {
    purchaseItem(upc, price, description, false)
  }

  const scanMember = (id, discount, name = 'Jeff Languid') => {
    overrideRetrieveMember(() => ({ member: id, discount, name }))
    const response = initializeTrackingResponse()
    postMember({ params: { id: checkoutId }, body: { id }}, response)
  }

  const postItemWithPrice = (upc, price) => {
    overrideRetrieveItem(() => ({upc, price, description: '', exempt: false}))
    postItem({params: {id: checkoutId}, body: {upc}}, response)
  }

  describe('checkout total', () => {
    beforeEach(() => {
      postCheckout({}, initializeTrackingResponse())
    })

    describe('given multiple posted items', () => {
      let response
      beforeEach(() => {
        postItemWithPrice('1', 3.00)
        postItemWithPrice('2', 4.00)
        response = initializeTrackingResponse()
      })

      describe('when a checkout total is requested', () => {
        beforeEach(() => postCheckoutTotal({params: {id: checkoutId}}, response))

        it('returns success status', () => {
          expect(response.status).toEqual(200)
        })

        it('returns total for items posted', () => {
          expectResponseToMatch(response, { total: 7.00 })
        })
      })
    })

    describe('when supplied invalid checkout id', () => {
      describe('when a checkout total is requested', () => {
        let response

        beforeEach(() => {
          response = initializeTrackingResponse()
          postCheckoutTotal({params: {id: 'unknown'}}, response)
        })

        it('returns status of 400', () => {
          expect(response.status).toEqual(400)
        })

        it('returns an appropriate error message', () => {
          expect(response.send).toHaveBeenCalledWith({error: 'nonexistent checkout'})
        })
      })
    })
  })

  describe('discounting', () => {
    beforeEach(() => response = initializeTrackingResponse())

    it('applies any member discount', () => {
      scanMember('719-287-4335', 0.25)
      purchase('333', 3.33)
      purchase('444', 4.44)
      postCheckoutTotal({ params: { id: checkoutId }}, response)
      expectResponseToMatch(response, { total: 5.83 })
    })

    it('3rd disc test', () => {
      scanMember('719-287-4335', 0.085)
      purchase('333', 4.40)
      purchaseExemptItem('444', 5.50)
      response = initializeTrackingResponse()
      postCheckoutTotal({ params: { id: checkoutId }}, response)
      expectResponseToMatch(response, { total: 9.53 })
    })

    it('discd tots', () => {
      purchaseExemptItem('444', 6.00)
      scanMember('719-287-4335', 0.10)
      purchase('333', 4.00)
      postCheckoutTotal({ params: { id: checkoutId }}, response)
      expectResponseToMatch(response, { totalOfDiscountedItems:  3.60 })
      // amount saved
      IncrementingIdGenerator.reset(1001)
      postCheckout({}, response)
      scanMember('719-287-4335', 0.10)
      purchase('333', 4.00)
      purchase('444', 6.00)
      response = initializeTrackingResponse()
      postCheckoutTotal({ params: { id: checkoutId }}, response)
      expectResponseToMatch(response, { /* totalOfDiscountedItems*/totalSaved:  1.00 })
    })

    it('provides 0 total for discounted items when no member scanned', () => {
      postCheckout({}, initializeTrackingResponse())
      purchase('333', 4.00)
      postCheckoutTotal({ params: { id: checkoutId }}, response)
      expectResponseToMatch(response, { totalOfDiscountedItems :   0.00 })
    })

    it('provides 0 total for discounted items when member discount is 0', () => {
      IncrementingIdGenerator.reset(1001)
      postCheckout({}, initializeTrackingResponse())
      scanMember('719-287-4335', 0.00)
      purchase('333', 4.00)
      postCheckoutTotal({ params: { id: checkoutId }}, response)
      expectResponseToMatch(response, { totalOfDiscountedItems :   0.00 })
    })
  })

  // While the tests here are in reasonable shape, to what extent
  // should we be verifying against formatted output?
  // And do any such tests belong in the route module?
  describe('message lines', () => {
    beforeEach(() => response = initializeTrackingResponse())

    it('includes items and total', () => {
      purchase('123', 5.00, 'Milk')
      purchase('555', 12.00, 'Fancy eggs')

      postCheckoutTotal({ params: { id: checkoutId } }, response)

      expectResponseToMatch(response, { messages:
          ['Milk                                     5.00',
            'Fancy eggs                              12.00',
            'TOTAL                                   17.00' ]})
    })

    it('includes discounts and total saved', () => {
      scanMember('719-287-4335', 0.10)
      purchase('123', 5.00, 'Milk')
      purchase('555', 2.79, 'Eggs')

      postCheckoutTotal({ params: { id: checkoutId } }, response)

      expectResponseToMatch(response, { messages:
          ['Milk                                     5.00',
            '   10% mbr disc                         -0.50',
            'Eggs                                     2.79',
            '   10% mbr disc                         -0.28',
            'TOTAL                                    7.01',
            '*** You saved:                           0.78' ] })
    })
  })
})
