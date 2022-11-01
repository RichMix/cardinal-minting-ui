import './styles.css'
import '@cardinal/namespaces-components/dist/esm/styles.css'
import 'tailwindcss/tailwind.css'

import * as amplitude from '@amplitude/analytics-browser'
import { WalletIdentityProvider } from '@cardinal/namespaces-components'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  BackpackWalletAdapter,
  BraveWalletAdapter,
  CoinbaseWalletAdapter,
  FractalWalletAdapter,
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'common/Notification'
import type { ProjectConfig } from 'config/config'
import type { AppProps } from 'next/app'
import { EnvironmentProvider } from 'providers/EnvironmentProvider'
import { ModalProvider } from 'providers/ModalProvider'
import {
  getInitialProps,
  ProjectConfigProvider,
} from 'providers/ProjectConfigProvider'
import { UTCNowProvider } from 'providers/UTCNowProvider'
import { useMemo } from 'react'

require('@solana/wallet-adapter-react-ui/styles.css')

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App = ({
  Component,
  pageProps,
  config,
  cluster,
}: AppProps & { config: ProjectConfig; cluster: string }) => {
  amplitude.init(
    process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ??
      '5416da0efc30dc892889733916be497b'
  )

  const network = useMemo(() => {
    switch (cluster) {
      case 'mainnet':
        return WalletAdapterNetwork.Mainnet
      case 'devnet':
        return WalletAdapterNetwork.Devnet
      case 'testnet':
        return WalletAdapterNetwork.Testnet
      default:
        return WalletAdapterNetwork.Mainnet
    }
  }, [cluster])

  const wallets = useMemo(
    () => [
      new BraveWalletAdapter(),
      new PhantomWalletAdapter(),
      new BackpackWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new CoinbaseWalletAdapter(),
      new SlopeWalletAdapter(),
      new FractalWalletAdapter(),
      new GlowWalletAdapter({ network }),
      new LedgerWalletAdapter(),
      new TorusWalletAdapter({ params: { network, showTorusButton: false } }),
    ],
    [network]
  )
  return (
    <EnvironmentProvider defaultCluster={cluster}>
      <UTCNowProvider>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletIdentityProvider>
            <ProjectConfigProvider defaultConfig={config}>
              <QueryClientProvider client={queryClient}>
                <ModalProvider>
                  <WalletModalProvider>
                    <>
                      <ToastContainer />
                      <Component {...pageProps} />
                      {<ReactQueryDevtools initialIsOpen={false} />}
                    </>
                  </WalletModalProvider>
                </ModalProvider>
              </QueryClientProvider>
            </ProjectConfigProvider>
          </WalletIdentityProvider>
        </WalletProvider>
      </UTCNowProvider>
    </EnvironmentProvider>
  )
}

App.getInitialProps = getInitialProps

export default App
