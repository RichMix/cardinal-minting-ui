import { Hyperspace } from 'assets/Hyperspace'
import { ButtonSmall } from 'common/ButtonSmall'

export const TradeButton = () => {
  return (
    <ButtonSmall
      onClick={() => window.open('https://hyperspace.xyz/', '_blank')}
      className="flex w-full items-center"
    >
      <div className="mr-1 text-lg">Trade</div>
      <Hyperspace />
    </ButtonSmall>
  )
}
