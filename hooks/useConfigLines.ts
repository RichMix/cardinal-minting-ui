import {
  CONFIG_ARRAY_START,
  CONFIG_LINE_SIZE,
} from '@cardinal/mpl-candy-machine-utils'
import * as beet from '@metaplex-foundation/beet'
import { useQuery } from '@tanstack/react-query'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'

import { CANDY_MACHINE_DATA_KEY } from './useCandyMachineData'
import { useCandyMachineId } from './useCandyMachineId'

export function chunkArray<T>(arr: T[], size: number): T[][] {
  return arr.length > size
    ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
    : [arr]
}

export const configLineBeet = new beet.FixableBeetArgsStruct(
  [
    ['name', beet.utf8String],
    ['uri', beet.utf8String],
  ],
  'ConfigLine'
)

const SUPPLY = 2500

export const useConfigLines = () => {
  const candyMachineId = useCandyMachineId()
  const { connection } = useEnvironmentCtx()
  return useQuery(
    [CANDY_MACHINE_DATA_KEY, 'useConfigLines', candyMachineId?.toString()],
    async () => {
      if (!candyMachineId) return
      const accountInfo = await connection.getAccountInfo(candyMachineId)
      const configLineOffset = CONFIG_ARRAY_START + 4
      const configLinesBytes = accountInfo?.data.slice(
        configLineOffset,
        configLineOffset + CONFIG_LINE_SIZE * SUPPLY
      )
      const configLines: { name: string; uri: string }[] = []
      for (let i = 0; i < SUPPLY; i++) {
        try {
          const configLineBytes = configLinesBytes?.slice(
            i * CONFIG_LINE_SIZE,
            i * CONFIG_LINE_SIZE + CONFIG_LINE_SIZE
          )
          const configLine = configLineBeet.deserialize(
            configLineBytes ?? Buffer.from(''),
            0
          )[0]
          configLines.push(configLine)
        } catch (e) {}
      }
      return configLines
    },
    {
      enabled: !!candyMachineId,
    }
  )
}
