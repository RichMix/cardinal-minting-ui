import { FooterSlim } from 'common/FooterSlim'
import { MainHero } from 'components/home/MainHero'
import Head from 'next/head'

export function Placeholder() {
  return (
    <div className="h-[300px] animate-pulse rounded-lg bg-white bg-opacity-5 p-10"></div>
  )
}

function Home() {
  return (
    <div className="relative z-0 min-h-screen bg-dark-5 flex flex-col">
      <Head>
        <title>Minting UI</title>
        <meta name="description" content="Cardinal NFT Minting UI" />
        <link rel="icon" href={'/favicon.ico'} />
        <script
          defer
          data-domain="stake.cardinal.so"
          src="https://plausible.io/js/plausible.js"
        />
        <meta name="og:title" content={`Cardinal NFT Minting UI`} />
        <meta name="og:description" content="Mint on Cardinal NFT Minting UI" />
        <meta property="og:url" content="https://rent.cardinal.so" />
        <meta
          name="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/preview`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@cardinal_labs" />
      </Head>
      <MainHero />
      <div className="z-10 mx-auto mt-48 flex flex-col grow gap-16 px-8 md:px-16"></div>
      <FooterSlim />
    </div>
  )
}

export default Home
