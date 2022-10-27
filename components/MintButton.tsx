import { Button } from 'common/Button'
import { useHandleMint } from 'handlers/useHandleMint'

export const MintButton = () => {
  const handleMint = useHandleMint()
  return (
    <Button
      className="w-full justify-center"
      loading={handleMint.isLoading}
      inlineLoader
      onClick={() => handleMint.mutate()}
    >
      Mint
    </Button>
  )
}
