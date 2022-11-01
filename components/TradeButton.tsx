import { Hyperspace } from 'assets/Hyperspace'
import { ButtonSmall } from 'common/ButtonSmall'
import { useWalletId } from 'hooks/useWalletId'

export const TradeButton = () => {
  const walletId = useWalletId()
  return (
    <ButtonSmall
      onClick={() =>
        window.open(
          `https://hyperspace.xyz/account/${walletId?.toString()}`,
          '_blank'
        )
      }
      className="flex w-full items-center"
    >
      <div className="mr-1 text-lg">Trade</div>
      <Hyperspace />
    </ButtonSmall>
  )
}
