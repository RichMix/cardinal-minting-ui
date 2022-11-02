import { useCandyMachineData } from 'hooks/useCandyMachineData'
import { useConfigLineImages } from 'hooks/useConfigLineImages'
import { useProjectConfig } from 'providers/ProjectConfigProvider'
import { useUTCNow } from 'providers/UTCNowProvider'
import { useEffect, useState } from 'react'

export const MintPreview = () => {
  const { UTCNow } = useUTCNow()
  const { config } = useProjectConfig()
  const configLineImages = useConfigLineImages()
  const mintImages =
    configLineImages.data && configLineImages.data.length > 0
      ? configLineImages.data
      : config.mintImages
  const [[imageUrl], setImageUrl] = useState<[string | undefined, number]>([
    undefined,
    0,
  ])
  const candyMachineData = useCandyMachineData()

  useEffect(() => {
    candyMachineData.data &&
      configLineImages.isFetched &&
      setImageUrl(([_, c]) => {
        let next = c + 1
        if (mintImages && c >= mintImages?.length - 1) next = 0
        return [
          mintImages
            ? mintImages[next]
            : `https://picsum.photos/600/600?q=${next}`,
          next,
        ]
      })
  }, [UTCNow])

  return (
    <div className="aspect-square w-full">
      {candyMachineData.data && configLineImages.isFetched ? (
        <img
          src={
            imageUrl ??
            (mintImages ? mintImages[0] : 'https://picsum.photos/600/600')
          }
          alt="Mint preview"
          className="rounded-lg"
        />
      ) : (
        <div className="aspect-square animate-pulse rounded-lg bg-border"></div>
      )}
    </div>
  )
}
