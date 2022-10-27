import { useCandyMachineData } from 'hooks/useCandyMachineData'
import { useUTCNow } from 'providers/UTCNowProvider'
import { useEffect, useState } from 'react'

export const MintPreview = () => {
  const { UTCNow } = useUTCNow()
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/600/600')
  const candyMachineData = useCandyMachineData()

  useEffect(() => {
    setImageUrl(`https://picsum.photos/600/600?q=${UTCNow}`)
  }, [UTCNow])
  return (
    <div className="aspect-square h-full w-full">
      {candyMachineData.data ? (
        <img src={imageUrl} alt="Mint preview" className="rounded-lg" />
      ) : (
        <div className="aspect-square animate-pulse rounded-lg bg-border"></div>
      )}
    </div>
  )
}
