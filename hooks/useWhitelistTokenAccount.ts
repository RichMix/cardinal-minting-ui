import { findAta } from '@cardinal/common'
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Keypair } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'

import {
  CANDY_MACHINE_DATA_KEY,
  useCandyMachineData,
} from './useCandyMachineData'
import { useWalletId } from './useWalletId'

export const useWhitelistTokenAccount = () => {
  const candyMachineData = useCandyMachineData()
  const walletId = useWalletId()
  const { connection } = useEnvironmentCtx()
  return useQuery(
    [
      CANDY_MACHINE_DATA_KEY,
      'useWhitelistTokenAccount',
      candyMachineData.data?.wallet.toString(),
      walletId?.toString(),
    ],
    async () => {
      if (!candyMachineData.data?.data.whitelistMintSettings) {
        return null
      }
      if (!walletId) return null
      const whitelistAta = await findAta(
        candyMachineData.data?.data.whitelistMintSettings.mint,
        walletId
      )
      const token = new Token(
        connection,
        candyMachineData.data?.data.whitelistMintSettings.mint,
        TOKEN_PROGRAM_ID,
        Keypair.generate()
      )
      return token.getAccountInfo(whitelistAta)
    },
    {
      enabled:
        !!walletId && !!candyMachineData.data?.data.whitelistMintSettings,
    }
  )
}
