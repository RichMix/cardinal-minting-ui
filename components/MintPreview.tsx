import { useCandyMachineData } from 'hooks/useCandyMachineData'
import { useProjectConfig } from 'providers/ProjectConfigProvider'
import { useUTCNow } from 'providers/UTCNowProvider'
import { useEffect, useState } from 'react'

export const MintPreview = () => {
  const { UTCNow } = useUTCNow()
  const { config } = useProjectConfig()
  const [[imageUrl], setImageUrl] = useState([
    config.mintImages ? config.mintImages[0] : 'https://picsum.photos/600/600',
    0,
  ])
  const candyMachineData = useCandyMachineData()

  useEffect(() => {
    setImageUrl(([_, c]) => {
      let next = c + 1
      if (config.mintImages && c >= config.mintImages?.length - 1) next = 0
      return [
        config.mintImages
          ? config.mintImages[next]
          : `https://picsum.photos/600/600?q=${next}`,
        next,
      ]
    })
  }, [UTCNow])
  return (
    <div className="aspect-square w-full">
      {candyMachineData.data ? (
        <img src={imageUrl} alt="Mint preview" className="rounded-lg" />
      ) : (
        <div className="aspect-square animate-pulse rounded-lg bg-border"></div>
      )}
    </div>
  )
}
