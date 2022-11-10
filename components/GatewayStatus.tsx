import { tryPublicKey } from '@cardinal/common'
import { Tooltip } from 'common/Tooltip'
import type { Phase } from 'config/config'
import { useCandyMachineData } from 'hooks/useCandyMachineData'
import { isValid, useGatewayToken } from 'hooks/useGatewayToken'
import { useWalletId } from 'hooks/useWalletId'
import { AiOutlineCheck, AiOutlineClose, AiOutlineLock } from 'react-icons/ai'

export const GatewayStatus = ({ phase }: { phase: Phase }) => {
  const walletId = useWalletId()
  const candyMachineData = useCandyMachineData()
  const gatekeeperNetwork = phase.allowlist
    ? tryPublicKey(phase.allowlist?.gatekeeperNetwork)
    : candyMachineData.data?.data.gatekeeper?.gatekeeperNetwork
  const gatewayToken = useGatewayToken(gatekeeperNetwork)
  if (!gatekeeperNetwork || !walletId) return <></>
  return (
    <div className="flex">
      {!gatewayToken.isFetched ? (
        <div className="h-[26px] w-16 animate-pulse rounded-lg bg-border" />
      ) : isValid(gatewayToken.data) ? (
        <Tooltip
          tooltip="Your wallet is approved to mint"
          className="cursor-pointer"
        >
          <div className="flex items-center rounded-lg border border-primary bg-primary bg-opacity-20 px-3 py-1 text-xs">
            <AiOutlineCheck className="mr-1" /> Elligible
          </div>
        </Tooltip>
      ) : gatewayToken.data && !isValid(gatewayToken.data) ? (
        <Tooltip
          tooltip="Your wallet whitelist has expired"
          className="cursor-pointer"
        >
          <div className="flex items-center gap-1 rounded-lg border border-red-500 bg-red-500 bg-opacity-20 px-3 py-1 text-xs">
            <AiOutlineClose /> Used
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          tooltip="Your wallet is not approved to mint"
          className="cursor-pointer"
        >
          <div className="flex items-center gap-1 rounded-lg border border-red-500 bg-red-500 bg-opacity-20 px-3 py-1 text-xs">
            <AiOutlineLock /> Inelligible
          </div>
        </Tooltip>
      )}
    </div>
  )
}
