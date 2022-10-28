import { css } from '@emotion/react'
import { Tooltip } from 'common/Tooltip'
import type { Phase } from 'config/config'
import { useCandyMachineData } from 'hooks/useCandyMachineData'
import { useUTCNow } from 'providers/UTCNowProvider'

export const MintPhase = ({ phase }: { phase: Phase }) => {
  const { UTCNow } = useUTCNow()
  const candyMachineData = useCandyMachineData()
  const goLiveSeconds =
    phase.goLiveSeconds ??
    parseInt(candyMachineData.data?.data.goLiveDate?.toString() || '')
  const live = UTCNow > goLiveSeconds
  return (
    <div
      className={`w-full cursor-pointer rounded-lg border-opacity-50 bg-light-4 bg-opacity-10 px-8 py-4 text-sm ${
        live ? 'border-2 border-primary' : 'border border-border'
      }`}
      css={css``}
    >
      <Tooltip title={undefined} className="">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="font-bold">{phase.title}</div>
            <div className="text-light-2">{phase.subtitle}</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-bold">
              {new Date(goLiveSeconds * 1000).toLocaleTimeString([], {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </div>
            <div className="text-light-2">{phase.description}</div>
          </div>
        </div>
      </Tooltip>
    </div>
  )
}
