import { randomBytes } from 'crypto'

export const genKey = () => randomBytes(32).toString('base64')
