import {
  GatewayTokenData,
  getGatewayTokenAddressForOwnerAndGatekeeperNetwork,
} from '@identity.com/solana-gateway-ts'
import type { PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'

import { useWalletId } from './useWalletId'

export const useGatewayToken = (
  gatekeeperNetwork: PublicKey | null | undefined
) => {
  const walletId = useWalletId()
  const { connection } = useEnvironmentCtx()
  return useQuery(
    ['useGatewayToken', gatekeeperNetwork?.toString(), walletId?.toString()],
    async () => {
      if (!gatekeeperNetwork) {
        throw 'No gatekeeper'
      }
      if (!walletId) throw 'No wallet found'
      const gatewayTokenKey =
        getGatewayTokenAddressForOwnerAndGatekeeperNetwork(
          walletId,
          gatekeeperNetwork
        )
      const gatewayTokenData = await connection.getAccountInfo(gatewayTokenKey)
      if (!gatewayTokenData?.data) return null
      return GatewayTokenData.fromAccount(gatewayTokenData?.data)
    },
    {
      enabled: !!walletId && !!gatekeeperNetwork,
    }
  )
}

export const isValid = (gatewayToken: GatewayTokenData | null | undefined) => {
  const expired = (gatewayToken?.expiry?.toNumber() ?? 0) < Date.now() / 1000
  return (
    gatewayToken?.state.enum === 'active' && gatewayToken?.expiry && !expired
  )
}
