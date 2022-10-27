import { css } from '@emotion/react'
import { useCandyMachineData } from 'hooks/useCandyMachineData'

export const MintSupply = () => {
  const candyMachineData = useCandyMachineData()
  const pct =
    (parseInt(candyMachineData.data?.itemsRedeemed.toString() || '') ?? 0) /
    (parseInt(candyMachineData.data?.data.maxSupply.toString() || '') ?? 0)
  return (
    <div className="relative h-8 w-full overflow-hidden rounded-xl bg-white bg-opacity-10">
      <div
        className="absolute h-full bg-primary"
        css={css`
          width: ${pct * 100}%;
        `}
      />
      <div className="absolute flex h-full w-full items-center justify-center gap-2">
        <div>{candyMachineData.data?.itemsRedeemed.toString() ?? 0}</div>
        <div>/</div>
        {candyMachineData.data ? (
          candyMachineData.data?.data.maxSupply.toString()
        ) : (
          <div className="h-2/3 w-8 animate-pulse rounded-lg bg-border"></div>
        )}
      </div>
    </div>
  )
}
