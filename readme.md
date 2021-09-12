# Crypto Price Wallpaper
### Get the latest crypto price on your home screen every minute

A nodejs based application which fetches price of crypto every minute and set that as your wallpaper.

## Config

You can add upto 12 comma separated crypto tickers or coingecko crypto ids in the currency.config.mjs file in the root directory. 

## Requirements

- Google Chrome
- NodeJS (14>=)
- Linux (cinnamon/gnome other distros can configure the command) and MacOS.

## Working

1. Fethces the crypto prices from binance api and uses coingecko api as fallback.
2. Generates the HTML markup.
3. Opens that markup page from google-chrome and takes a screenshot
4. Sets that screenshot as background wallpaper.



## Installation

Install the dependencies and start the server.

```sh
cd crypto-price-wallpaper
npm i
node app.mjs
```
