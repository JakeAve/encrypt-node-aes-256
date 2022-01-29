import fs from 'fs'
import { decrypt } from './main.js'

const [, , filePath, base64Key] = process.argv
const key = base64Key && Buffer.from(base64Key, 'base64')

try {
  const file = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const decrypted = decrypt(file, { key })
  if (!decrypted) throw new Error('Decryption failed. No modifications made.')
  fs.writeFileSync(filePath, decrypted)
  console.log(`${filePath} is decryped 🎉 `)
} catch (err) {
  console.log(err)
}
