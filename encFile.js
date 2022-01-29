import fs from 'fs'
import { encrypt } from './main.js'

const [, , filePath, base64Key] = process.argv
const key = base64Key && Buffer.from(base64Key, 'base64')

try {
  const file = fs.readFileSync(filePath)
  const encrypted = encrypt(file, { key })
  if (!encrypted) throw new Error('Encryption failed. No modifications made.')
  fs.writeFileSync(filePath, encrypted)
  console.log(`${filePath} is encryped 🎊`)
} catch (err) {
  console.log(err)
}
