import child_process from 'child_process'
import util from 'util'
import { imageURL, imagePath } from '../utils/paths.mjs'

const exec = util.promisify(child_process.exec);

async function setWallpaper() {
    if (process.platform === 'linux' && process.env.DESKTOP_SESSION === 'cinnamon') {
        const { cinnamonError, cinnamonResponse } = await exec(`gsettings set org.cinnamon.desktop.background picture-uri "${imageURL}"`);
        if (cinnamonError) throw new Error("Unable to set wallpaper")
        return
    }

    if (process.platform === 'linux' &&process.env.DESKTOP_SESSION === 'gnome') {
        const { gnomeErorr, gnomeResponse } = await exec(`gsettings set org.gnome.desktop.background picture-uri "${imageURL}"`)
        if (gnomeErorr) throw new Error("Unable to set wallpaper")
        return
    }
    if (process.platform === 'darwin') {
        const { macosError, macOsResponse } = await exec(`sqlite3 ~/Library/Application\ Support/Dock/desktoppicture.db "update data set value = '${imagePath}'"; killall Dock;`)
        if (macosError) throw new Error("Unable to set wallpaper on macos")
        return
    }

    throw new Error("Configure the step to set the wallpaper")
}


export default setWallpaper