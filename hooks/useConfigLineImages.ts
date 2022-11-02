import { useQuery } from '@tanstack/react-query'

import { CANDY_MACHINE_DATA_KEY } from './useCandyMachineData'
import { useConfigLines } from './useConfigLines'

export type Metadata = {
  image: string
}
export const useConfigLineImages = () => {
  const configLines = useConfigLines()
  return useQuery(
    [CANDY_MACHINE_DATA_KEY, 'useConfigLineImages', configLines],
    async () => {
      if (!configLines.data) return null
      const uris = configLines.data
      const uniqueUris = Object.keys(
        uris.reduce((acc, { uri }) => {
          if (uri in acc) return acc
          acc[uri] = true
          return acc
        }, {} as { [s: string]: boolean })
      )

      const metadata = await Promise.all(
        uniqueUris?.map(async (uri) => {
          try {
            const json = await fetch(uri).then((r) => r.json())
            return json as Metadata
          } catch (e) {
            return null
          }
        })
      )
      return metadata
        .filter((md): md is Metadata => !!md)
        .map((md) => md.image)
        .sort(() => 0.5 - Math.random())
    },
    {
      enabled: configLines.isFetched,
    }
  )
}
