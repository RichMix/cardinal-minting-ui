import { Hyperspace } from 'assets/Hyperspace'
import { ButtonSmall } from 'common/ButtonSmall'
import { useWalletId } from 'hooks/useWalletId'

export type TradeButtonOptions = 'hyperspace' | 'coralcube'

export const TradeButtons = ({
  tradeButtons,
}: {
  tradeButtons?: TradeButtonOptions[]
}) => {
  const walletId = useWalletId()
  return (
    <div className="flex w-full flex-col gap-1">
      {(!tradeButtons || tradeButtons.includes('hyperspace')) && (
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
      )}
      {(!tradeButtons || tradeButtons.includes('coralcube')) && (
        <ButtonSmall
          onClick={() =>
            window.open(`https://coralcube.io/collection/bat`, '_blank')
          }
          className="flex w-full items-center"
        >
          <div className="mr-1 text-lg">Trade</div>
          <img src="/logos/coral-cube.svg" className="h-5" alt="coral cube" />
          <div>Coral Cube</div>
        </ButtonSmall>
      )}
    </div>
  )
}
