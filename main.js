import dotenv from 'dotenv'
dotenv.config()
import crypto from 'crypto'
const ENCRYPTION_KEY = process.env.AES_256_GCM_KEY

/**
 * Decrypts message from base64 string
 * @param {UTF8String} buf - message to encrypt
 * @param {object} options - {Buffer} key, {Buffer} iv
 *
 * @returns {Base64String}
 */
export const encrypt = (buf, options = {}) => {
  try {
    const {
      key = Buffer.from(ENCRYPTION_KEY, 'base64'),
      iv = crypto.randomBytes(12),
    } = options
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
    const encrypted = Buffer.concat([cipher.update(buf)].concat(cipher.final()))
    const tag = cipher.getAuthTag()
    const payload = Buffer.concat([iv, encrypted, tag])
    return payload.toString('base64')
  } catch (e) {
    console.error(e)
    return null
  }
}

/**
 * Decrypts message from base64 string
 * @param {Base64String} buf - message to decrypt
 * @param {object} options - {Buffer} key, {number} ivBytes
 *
 * @returns {UTF8string}
 */
export const decrypt = (buf, options = {}) => {
  try {
    const { key = Buffer.from(ENCRYPTION_KEY, 'base64'), ivBytes = 12 } =
      options
    const payload = Buffer.from(buf, 'base64')
    const iv = payload.slice(0, ivBytes)
    const encrypted = payload.slice(ivBytes, payload.byteLength - 16)
    // the tag is the last 16 bytes
    const tag = payload.slice(payload.byteLength - 16)
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(tag)
    const decrypted = Buffer.concat(
      [decipher.update(encrypted)].concat(decipher.final())
    )
    return decrypted.toString('utf-8')
  } catch (e) {
    console.error(e)
    return null
  }
}
