import child_process from 'child_process'
import util from 'util'
import { markupPath, imagePath } from '../utils/paths.mjs'

const exec = util.promisify(child_process.exec);

async function takeScreenshot() {
    const { chromeError, chromeResponse } = await exec(`google-chrome --headless --screenshot="${imagePath}" --window-size=1920,1080 "${markupPath}"`);
    if (chromeError) throw new Error("Please intall chrome or you can setup the script to take screenshot")
}

export default takeScreenshot