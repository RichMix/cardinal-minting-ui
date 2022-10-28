import { tryPublicKey } from '@cardinal/namespaces-components'
import { useRouter } from 'next/router'
import { useProjectConfig } from 'providers/ProjectConfigProvider'

export const useCandyMachineId = () => {
  const { query } = useRouter()
  const { config } = useProjectConfig()
  const tryCandyMachineId =
    tryPublicKey(query.config) ??
    tryPublicKey(config.candyMachineId) ??
    undefined
  return tryCandyMachineId
}
