function markupGenerator(cryptoList) {

    let markup = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" href="./index.css">
    </head>
    <body>
        <div class="leftBox"></div>
        <div class="rightBox">`

    cryptoList.forEach(({ name, price, change, difference }) => {
        markup += `
        <section class="currencyBlock textPrimary">
            <span class="currencyName">${name}</span>
            :
            <span class="currencyPrice">${price} $</span>`
        if (change != undefined) {
            if (change === 0) {
                markup += `<span class="neutral">(0 %)</span>`
            }
            else {
                markup += `<span class="${change > 0 ? 'positive' : 'negative'}">(${change > 0 ? '+' : '-'} ${(difference * 100 / price).toFixed(2)} %)</span>`
            }
        }
        markup += `</section>`
    })

    markup += `
        </div>
    </body>
    </html>`

    return markup
}


export default markupGenerator