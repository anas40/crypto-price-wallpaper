import { fileURLToPath, pathToFileURL } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const markupPath = path.join(__dirname, '../page/index.html')
const imagePath = path.join(__dirname, '../page/price.png')
const imageURL = pathToFileURL(imagePath)

export { markupPath, imagePath, imageURL }