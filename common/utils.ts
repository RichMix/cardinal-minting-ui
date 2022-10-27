import { tryPublicKey } from '@cardinal/common'

export const publicKeyValidationTest = (value: string | undefined): boolean => {
  return tryPublicKey(value) ? true : false
}
