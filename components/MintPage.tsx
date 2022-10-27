import { MintButton } from './MintButton'
import { MintInfo } from './MintInfo'
import { MintPhase } from './MintPhase'
import { MintPreview } from './MintPreview'
import { MintSupply } from './MintSupply'
import { TradeButton } from './TradeButton'

export const MintPage = () => {
  return (
    <div className="mx-auto mt-24 flex w-full max-w-[900px] flex-wrap gap-10 px-10">
      <div className="flex flex-1 flex-col items-center gap-4">
        <MintInfo />
        <MintPhase />
      </div>
      <div className="flex min-w-[300px] flex-1 flex-col items-center gap-4">
        <MintPreview />
        <MintSupply />
        <MintButton />
        <TradeButton />
      </div>
    </div>
  )
}
