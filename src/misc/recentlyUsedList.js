
/*

portfolio => create    {}

- is empty when no purchases made

    const portfolio = create()
    expect(isEmpty(newPortfolio)).toBe(true)       isEmpty => true


- is not empty after any purchase made

    const portfolio = create()
    const newPortfolio = purchase(portfolio, "BAYN", 10)
    expect(isEmpty(newPortfolio)).toBe(false)

    create => { isEmpty: true }
    purchase => { isEmpty: false }

- count of unique symbols

    - is 0 when no purchases made    count => 0
    - is 1 after purchase made        count =>  isEmpty ? 0 : 1
    - increments with purchase of distinct symbol     count => symbolsCount++
    - does not increment when purchasing existing symbol    purchase =>   set.add(symbol)
                                                            count => set.size()


- number of shares for a symbol  =>   {  BAYN: 10, IBM: 20 }

 */
