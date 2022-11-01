import {
  GatewayTokenData,
  getGatewayTokenAddressForOwnerAndGatekeeperNetwork,
} from '@identity.com/solana-gateway-ts'
import { useQuery } from '@tanstack/react-query'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'

import { useCandyMachineData } from './useCandyMachineData'
import { useWalletId } from './useWalletId'

export const useGatewayToken = () => {
  const candyMachineData = useCandyMachineData()
  const walletId = useWalletId()
  const { connection } = useEnvironmentCtx()
  return useQuery(
    ['useGatewayToken', candyMachineData.data?.wallet.toString()],
    async () => {
      if (!candyMachineData.data?.data.gatekeeper?.gatekeeperNetwork) {
        throw 'No gatekeeper'
      }
      if (!walletId) throw 'No wallet found'
      const gatewayTokenKey =
        getGatewayTokenAddressForOwnerAndGatekeeperNetwork(
          walletId,
          candyMachineData.data?.data.gatekeeper?.gatekeeperNetwork
        )
      const gatewayTokenData = await connection.getAccountInfo(gatewayTokenKey)
      if (!gatewayTokenData?.data) return null
      return GatewayTokenData.fromAccount(gatewayTokenData?.data)
    },
    {
      enabled: !!walletId && !!candyMachineData.data?.data.gatekeeper,
    }
  )
}

export const isValid = (gatewayToken: GatewayTokenData | null | undefined) => {
  const expired = (gatewayToken?.expiry?.toNumber() ?? 0) < Date.now() / 1000
  return (
    gatewayToken?.state.enum === 'active' && gatewayToken?.expiry && !expired
  )
}
