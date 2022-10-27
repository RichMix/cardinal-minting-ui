import { Hyperspace } from 'assets/Hyperspace'
import { ButtonSmall } from 'common/ButtonSmall'

export const TradeButton = () => {
  return (
    <ButtonSmall className="flex w-full items-center">
      <div className="mr-1 text-lg">Trade</div>
      <Hyperspace />
    </ButtonSmall>
  )
}
