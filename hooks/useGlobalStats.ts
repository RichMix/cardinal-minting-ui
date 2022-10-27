import { useQuery } from 'react-query'

type StatKey = 'total-mints' | 'total-tokens-vested' | 'total-wallets'
export const statsNames: StatKey[] = [
  'total-mints',
  'total-tokens-vested',
  'total-wallets',
]

export const useGlobalStats = () => {
  return useQuery<
    | {
        [n: string]: { data: number }
      }
    | undefined
  >(['useGlobalStats'], () => {
    return {
      'total-mints': { data: 1 },
      'total-tokens-vested': { data: 3400 },
      'total-wallets': { data: 40 },
    }
  })
}

export const statsNameMapping: { key: StatKey; displayName: string }[] = [
  {
    key: 'total-mints',
    displayName: 'Total Mints Vested',
  },
  {
    key: 'total-tokens-vested',
    displayName: 'Total Tokens Vested',
  },
  {
    key: 'total-wallets',
    displayName: 'Total Wallets',
  },
]
