import crypto from "crypto"

export const generateOtp = (): string => {
  return crypto.randomInt(0, 1000000).toString().padStart(6, "0")
}

export const expiryTime = (): Date => {
  return new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
}