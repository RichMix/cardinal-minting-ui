import { findAta } from '@cardinal/common'
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import type { PublicKey } from '@solana/web3.js'
import { Keypair } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'

import { CANDY_MACHINE_DATA_KEY } from './useCandyMachineData'
import { useWalletId } from './useWalletId'

export const useWhitelistTokenAccount = (
  whitelistMint: PublicKey | null | undefined
) => {
  const walletId = useWalletId()
  const { connection } = useEnvironmentCtx()
  return useQuery(
    [
      CANDY_MACHINE_DATA_KEY,
      'useWhitelistTokenAccount',
      whitelistMint?.toString(),
      walletId?.toString(),
    ],
    async () => {
      if (!whitelistMint) {
        return null
      }
      if (!walletId) return null
      const whitelistAta = await findAta(whitelistMint, walletId)
      const token = new Token(
        connection,
        whitelistMint,
        TOKEN_PROGRAM_ID,
        Keypair.generate()
      )
      return token.getAccountInfo(whitelistAta)
    },
    {
      enabled: !!walletId && !!whitelistMint,
      retry: false,
    }
  )
}
