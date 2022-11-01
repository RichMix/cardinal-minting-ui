import { Tooltip } from 'common/Tooltip'
import { useCandyMachineData } from 'hooks/useCandyMachineData'
import { useWhitelistTokenAccount } from 'hooks/useWhitelistTokenAccount'
import { AiOutlineCheck, AiOutlineLock } from 'react-icons/ai'

export const WhitelistTokenStatus = () => {
  const candyMachineData = useCandyMachineData()
  const whitelistTokenAccount = useWhitelistTokenAccount()
  const amount = whitelistTokenAccount.data?.amount.toNumber().toString()
  if (!candyMachineData.data?.data.whitelistMintSettings) return <></>
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
            <AiOutlineCheck className="mr-1" /> Elligible ({amount})
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          tooltip="Your wallet holds no whitelist tokens to mint"
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
