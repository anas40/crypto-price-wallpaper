import fetch from 'node-fetch'
import nameToSymbol from './nameToSymbol.mjs'

async function fetchPrice(cryptoList, previosDataMap) {
    try {

        //getting data from binance api
        const binanceData = await getBinanceData()
        const binanceCryptoMap = binanceDataMap(binanceData)

        //finding list of crypto not on by binance
        const [binanceMap, geckoList] = separator(cryptoList, binanceCryptoMap)

        //finding those on coingecko
        const geckoData = await getGeckoData(geckoList)
        const geckoMap = geckoDataMap(geckoList, geckoData)

        //complete map of all required crypto price
        const fullDataMap = { ...binanceMap, ...geckoMap }

        //formatting
        const formattedData = formatData(fullDataMap, previosDataMap)

        return [formattedData,fullDataMap]

    }
    catch (error) {
        console.log("Problem in price fethcing")
        console.log(error)
        return []
    }
}

function formatData(cryptoMap,previosDataMap) {
    const cryptoDetails = []

    for (let [cryptoName, price] of Object.entries(cryptoMap)) {
        price = parseFloat(price)

        let truncatedPrice = price

        if (price > .01) truncatedPrice = price.toFixed(5)
        if (price > .1) truncatedPrice = price.toFixed(4)
        if (price > 1) truncatedPrice = price.toFixed(3)
        if (price > 10) truncatedPrice = price.toFixed(2)
        if (price > 100) truncatedPrice = price.toFixed(1)

        const cryptoDetail = {
            name: cryptoName.toUpperCase(),
            price: truncatedPrice
        }

        if (!previosDataMap) {
            cryptoDetails.push(cryptoDetail)
            continue
        }

        const previousPrice = parseFloat(previosDataMap[cryptoName])

        if (price === previousPrice) cryptoDetail.change = 0
        else cryptoDetail.change = (price > previousPrice ? 1 : -1)

        cryptoDetail.difference = Math.abs(previousPrice - price)

        cryptoDetails.push(cryptoDetail)
    }

    return cryptoDetails
}


function separator(cryptoList, cryptoMap) {
    const cryptoData = {}
    const geckoList = []
    for (const name of cryptoList) {
        const symbol = nameToSymbol(name)
        if (!cryptoMap[symbol]) {
            geckoList.push(name)
            continue
        }
        cryptoData[name] = cryptoMap[symbol]
    }
    return [cryptoData, geckoList]
}

async function getBinanceData() {
    const url = new URL('https://api.binance.com/api/v3/ticker/price')

    const response = await fetch(url)

    if (response.status !== 200) {
        throw new Error("Unable to get data from binance")
    }

    return response.json()
}

function binanceDataMap(data) {
    const symbolToPrice = {}
    data.forEach(token => {
        symbolToPrice[token.symbol] = token.price
    })
    return symbolToPrice
}

async function getGeckoData(cryptoList) {
    const url = new URL('https://api.coingecko.com/api/v3/simple/price')

    let cryptoString = ""
    for (const crypto of cryptoList) cryptoString += `${crypto},`
    cryptoString = cryptoString.slice(0, -1);

    url.searchParams.set('ids', cryptoString)
    url.searchParams.set('vs_currencies', 'usd')

    const response = await fetch(url)

    if (response.status !== 200) {
        throw new Error("Unable to get data from coingecko")
    }

    return response.json()
}

function geckoDataMap(list, data) {
    const cryptoMap = {}

    for (const crypto of list) {
        if (data[crypto]?.usd)
            cryptoMap[crypto] = data[crypto].usd
        else throw new Error(`Unable to find ${crypto}, please check the ticker or coingecko id`)
    }

    return cryptoMap
}


export default fetchPrice