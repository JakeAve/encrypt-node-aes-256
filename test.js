// Used this to test, maybe useful later
import { encrypt, decrypt } from './main.js'
import { genKey } from './genAES256GCMKey.js'

const key = Buffer.from(genKey(), 'base64')

const testStrings = [
  `〒102-0082 東京都千代田区一`,
  `hello world, 1234567890`,
  `الكويت أو (رسميًا: دَوْلَةُ الْكُوَيْت)؛`,
  `Привет, мир!`,
]

class CryptoTestString {
  constructor(decrypted) {
    this.decrypted = decrypted
    this.encrypted = encrypt(decrypted, { key })
    this.computedDecryptedFromEncrypted = decrypt(this.encrypted, { key })
  }

  get canEncrypt() {
    return this.decrypted !== this.encrypted
  }

  get canDecrypt() {
    return this.decrypted === this.computedDecryptedFromEncrypted
  }

  get isValid() {
    return this.canEncrypt && this.canDecrypt
  }

  test() {
    return {
      string: this.decrypted.slice(0, 10) + '...',
      encrypted: this.encrypted.slice(0, 10) + '...',
      canDecrypt: this.canDecrypt,
      canEncrypt: this.canEncrypt,
      isValid: this.isValid,
      test: this,
    }
  }
}

class EncryptionHelperTest {
  constructor(strings) {
    this.strings = strings
    this.tests = this.strings.map((s) => new CryptoTestString(s))
  }

  run() {
    const results = this.tests.map((t) => t.test())
    const allPassed = results.every((r) => r.isValid)

    if (!allPassed) {
      const failedTests = results.filter((r) => !r.isValid)
      console.log(`EncryptionHelperTest tests failed: ${failedTests.length}`)
      console.log(failedTests.map(({ test }) => JSON.stringify(test, null, 2)))
      console.error(`EncryptionHelperTest failed 😭 😭 😭 Details above👆`)
    } else {
      console.table(results)
      console.log('EncryptionHelperTest passed 🎉  🎊  😁')
    }

    return allPassed
  }
}

console.time('test-time')
new EncryptionHelperTest(testStrings).run()
console.timeEnd('test-time')
