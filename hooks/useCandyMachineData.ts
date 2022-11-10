import { CandyMachine } from '@cardinal/mpl-candy-machine-utils'
import { useQuery } from '@tanstack/react-query'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'

import { useCandyMachineId } from './useCandyMachineId'

export const CANDY_MACHINE_DATA_KEY = 'candy-machine'
export const useCandyMachineData = () => {
  const candyMachineId = useCandyMachineId()
  const { connection } = useEnvironmentCtx()
  return useQuery(
    [CANDY_MACHINE_DATA_KEY, candyMachineId?.toString()],
    async () => {
      if (!candyMachineId) return
      return CandyMachine.fromAccountAddress(connection, candyMachineId)
    },
    {
      enabled: !!candyMachineId,
      refetchInterval: 1000,
    }
  )
}
