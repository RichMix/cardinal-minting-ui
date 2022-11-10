import { tryPublicKey } from '@cardinal/common'
import { Tooltip } from 'common/Tooltip'
import type { Phase } from 'config/config'
import { useCandyMachineData } from 'hooks/useCandyMachineData'
import { useWalletId } from 'hooks/useWalletId'
import { useWhitelistTokenAccount } from 'hooks/useWhitelistTokenAccount'
import { AiOutlineCheck, AiOutlineLock } from 'react-icons/ai'

export const WhitelistTokenStatus = ({ phase }: { phase: Phase }) => {
  const candyMachineData = useCandyMachineData()
  const walletId = useWalletId()
  const whitelistMint = phase.whitelistMintSettings
    ? tryPublicKey(phase.whitelistMintSettings?.mint)
    : candyMachineData.data?.data.whitelistMintSettings?.mint
  const whitelistTokenAccount = useWhitelistTokenAccount(whitelistMint)
  const amount = whitelistTokenAccount.data?.amount.toNumber().toString()
  if (!whitelistMint || !walletId) return <></>
  return (
    <div className="flex">
      {!whitelistTokenAccount.isFetched ? (
        <div className="h-[26px] w-16 animate-pulse rounded-lg bg-border" />
      ) : whitelistTokenAccount.data?.amount &&
        whitelistTokenAccount.data?.amount.toNumber() > 0 ? (
        <Tooltip
          tooltip={`Your wallet is approved to mint ${amount} token using whitelist token`}
          className="cursor-pointer"
        >
          <div className="flex items-center rounded-lg border border-primary bg-primary bg-opacity-20 px-3 py-1 text-xs">
            <AiOutlineCheck className="mr-1" /> Remaining ({amount})
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          tooltip="Your wallet holds no whitelist tokens to mint"
          className="cursor-pointer"
        >
          <div className="flex items-center gap-1 rounded-lg border border-red-500 bg-red-500 bg-opacity-20 px-3 py-1 text-xs">
            <AiOutlineLock /> Remaining (0)
          </div>
        </Tooltip>
      )}
    </div>
  )
}
