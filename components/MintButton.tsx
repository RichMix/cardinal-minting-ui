import { Button } from 'common/Button'
import { useHandleMint } from 'handlers/useHandleMint'
import { useProjectConfig } from 'providers/ProjectConfigProvider'

export const MintButton = () => {
  const handleMint = useHandleMint()
  const { config } = useProjectConfig()
  return (
    <Button
      className="w-full justify-center"
      loading={handleMint.isLoading}
      inlineLoader
      onClick={() => handleMint.mutate()}
    >
      {config.logoImage && (
        <img
          className="mr-1 w-4"
          src={config.logoImage}
          alt={config.displayName}
        />
      )}
      Mint
    </Button>
  )
}
