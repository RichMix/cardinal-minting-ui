import { useCandyMachineData } from 'hooks/useCandyMachineData'

export const MintPhase = () => {
  const candyMachineData = useCandyMachineData()
  if (!candyMachineData.data) return <></>
  return (
    <div className="w-full rounded-lg border border-primary border-opacity-50 bg-light-4 bg-opacity-10 px-8 py-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="font-bold">Phase I</div>
          <div className="text-light-2">Public Mint</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="font-bold">Go Live:</div>
          <div className="text-light-2">
            {new Date(
              parseInt(
                candyMachineData.data.data.goLiveDate?.toString() || ''
              ) * 1000
            ).toLocaleTimeString([], {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
