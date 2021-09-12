import fs from 'fs'

import sleep from './utils/sleep.mjs'
import markupGenerator from './utils/markupGenerator.mjs'
import fetchPrice from './utils/fetchPrice.mjs'
import cryptoList from './currency.config.mjs'
import { markupPath } from './utils/paths.mjs'
import { takeScreenshot, setWallpaper } from './commands/index.mjs'

let previousData = null

start()
async function start() {
    try {
        //max 12 are allowed because of UI
        if (cryptoList.length > 12) throw new Error("Maximum 12 crypto can be added")

        //fetches the formatted price of interested crypto
        const [symbolsData, fullDataMap] = await fetchPrice(cryptoList, previousData)

        //storing for calculating % change
        previousData = fullDataMap

        //sorting in dictionary order by crypto name
        symbolsData.sort((first, second) => first.name > second.name ? 1 : -1)

        //generates the markup
        const markup = markupGenerator(symbolsData)

        //saves the file
        fs.writeFileSync(markupPath, markup)

        //open file with browser and take screenshot
        await takeScreenshot()

        //set the screenshot as wallpaper
        await setWallpaper()

        //sleep
        await sleep(1000 * 60)

        //calling recursively (async function so stack does not build up)
        start()
    }
    catch (error) {
        console.log("Stopped")
        console.log(error);
    }
}





