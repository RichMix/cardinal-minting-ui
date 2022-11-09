import type { IconKey } from 'common/Socials'
import type React from 'react'

export type Colors = {
  accent: string
  glow: string
}

export type Badge = {
  badgeType: 'recent' | 'trending' | 'expiration' | 'wrapped' | 'unwrapped'
  position?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'
  content?: JSX.Element | string
}

export type Phase = {
  tooltip?: React.ReactNode
  title: React.ReactNode
  subtitle: React.ReactNode
  description: React.ReactNode
  allowlist?: {
    gatekeeperNetwork: string
    expireOnUse?: boolean
  }
  payment?: {
    paymentMint?: string
    paymentAmount: number
  }
  goLiveSeconds?: number
  endSeconds?: number
}

export type ProjectConfig = {
  hidden?: boolean
  indexMetadataDisabled?: boolean
  name: string
  displayName: string
  websiteUrl: string
  hero?: string
  description?: string
  hostname?: string
  twitterHandle?: string
  socialLinks?: {
    icon: IconKey
    link: string
  }[]
  logoImage?: string
  logoPadding?: boolean
  colors: Colors
  sponsors?: string[]
  badges?: Badge[]
  mintImages?: string[]
  phases?: Phase[]
  candyMachineId?: string
}

export const LISTING_AUTHORITY_NAME = 'global'

export const projectConfigs: { [key: string]: ProjectConfig } = {
  brave: {
    name: 'brave',
    displayName: 'BAT x Adam Ape for Brave',
    description: `Basic Attention Token (BAT) has joined forces with Adam Ape, a renowned multidisciplinary artist in Web3 and the traditional graphic design and digital animation space, on its 2500-piece genesis Solana NFT collection: BAT x Adam Ape for Brave.\n\nTogether, they created four PFP-style NFTs modeled after Brave’s logo. Each of the four NFTs—The Curious, The Dabbler, The Degen, and The Sage—is dynamically animated with facial expressions and sound effects and represents one of four stages of immersion in Web3.`,
    // logoImage: 'brave/brave-logo.png',
    websiteUrl: 'https://cardinal.so',
    socialLinks: [
      {
        icon: 'web',
        link: 'https://brave.com/',
      },
      {
        icon: 'twitter',
        link: 'https://brave.com/',
      },
    ],
    colors: {
      accent: '#e74a27',
      glow: '#e74a27',
    },
    sponsors: ['/logos/bat.png', '/logos/brave.png', '/logos/magic-eden.png'],
    mintImages: ['brave/brave-0.png', 'brave/brave-1.png', 'brave/brave-2.png'],
    candyMachineId: '8P1UPnxU1rPKTmMEbneQ2VQW99uLPxboP3QWkgQfuagV',
    phases: [
      {
        tooltip: 'Must hold an Adam Ape NFT',
        title: 'Phase I',
        subtitle: 'Adam Ape NFT holdrs',
        description: '',
        allowlist: {
          gatekeeperNetwork: '6MSNwwsuHzv76oXhdx2PGZXyZtB7SzCEof9vKksTMZpE',
          expireOnUse: true,
        },
        payment: {
          paymentMint: 'EPeUFDgHRxs9xxEPVaL6kfGQvCon7jmAWKVUHuux1Tpz',
          paymentAmount: 20000000000,
        },
        goLiveSeconds: 1668099600,
        endSeconds: 1668099600 + 60 * 30,
      },
      {
        tooltip: 'Mint using BAT token',
        title: 'Phase II',
        subtitle: 'Whitelist BAT Mint',
        description: '',
        allowlist: {
          gatekeeperNetwork: '6MSNwwsuHzv76oXhdx2PGZXyZtB7SzCEof9vKksTMZpE',
          expireOnUse: true,
        },
        payment: {
          paymentMint: 'EPeUFDgHRxs9xxEPVaL6kfGQvCon7jmAWKVUHuux1Tpz',
          paymentAmount: 20000000000,
        },
        goLiveSeconds: 1668099600 + 60 * 30,
        endSeconds: 1668099600 + 60 * 60,
      },
      {
        title: 'Phase III',
        subtitle: 'Whitelist SOL Mint',
        description: '',
        allowlist: {
          gatekeeperNetwork: '6MSNwwsuHzv76oXhdx2PGZXyZtB7SzCEof9vKksTMZpE',
          expireOnUse: true,
        },
        payment: {
          paymentAmount: 100000000,
        },
        goLiveSeconds: 1668099600 + 60 * 60,
        endSeconds: 1668099600 + 60 * 120,
      },
      {
        title: 'Phase IV',
        subtitle: 'Public SOL Mint',
        description: '',
        payment: {
          paymentAmount: 150000000,
        },
        goLiveSeconds: 1668099600 + 60 * 120,
      },
    ],
  },
  bat: {
    name: 'bat',
    displayName: 'BAT x Adam Ape for Brave',
    description: `Basic Attention Token (BAT) has joined forces with Adam Ape, a renowned multidisciplinary artist in Web3 and the traditional graphic design and digital animation space, on its 2500-piece genesis Solana NFT collection: BAT x Adam Ape for Brave.\n\nTogether, they created four PFP-style NFTs modeled after Brave’s logo. Each of the four NFTs—The Curious, The Dabbler, The Degen, and The Sage—is dynamically animated with facial expressions and sound effects and represents one of four stages of immersion in Web3.`,
    // logoImage: 'brave/brave-logo.png',
    websiteUrl: 'https://cardinal.so',
    socialLinks: [
      {
        icon: 'web',
        link: 'https://brave.com/',
      },
      {
        icon: 'twitter',
        link: 'https://brave.com/',
      },
    ],
    colors: {
      accent: '#e74a27',
      glow: '#e74a27',
    },
    sponsors: ['/logos/bat.png', '/logos/brave.png', '/logos/magic-eden.png'],
    mintImages: ['brave/brave-0.png', 'brave/brave-1.png', 'brave/brave-2.png'],
    candyMachineId: '8P1UPnxU1rPKTmMEbneQ2VQW99uLPxboP3QWkgQfuagV',
    phases: [
      {
        tooltip: 'Must hold an Adam Ape NFT',
        title: 'Phase I',
        subtitle: 'Adam Ape NFT holdrs',
        description: '',
        allowlist: {
          gatekeeperNetwork: '6MSNwwsuHzv76oXhdx2PGZXyZtB7SzCEof9vKksTMZpE',
          expireOnUse: true,
        },
        payment: {
          paymentMint: 'EPeUFDgHRxs9xxEPVaL6kfGQvCon7jmAWKVUHuux1Tpz',
          paymentAmount: 20000000000,
        },
        goLiveSeconds: 1668099600,
        endSeconds: 1668099600 + 60 * 30,
      },
      {
        tooltip: 'Mint using BAT token',
        title: 'Phase II',
        subtitle: 'Whitelist BAT Mint',
        description: '',
        allowlist: {
          gatekeeperNetwork: '6MSNwwsuHzv76oXhdx2PGZXyZtB7SzCEof9vKksTMZpE',
          expireOnUse: true,
        },
        payment: {
          paymentMint: 'EPeUFDgHRxs9xxEPVaL6kfGQvCon7jmAWKVUHuux1Tpz',
          paymentAmount: 20000000000,
        },
        goLiveSeconds: 1668099600 + 60 * 30,
        endSeconds: 1668099600 + 60 * 60,
      },
      {
        title: 'Phase III',
        subtitle: 'Whitelist SOL Mint',
        description: '',
        allowlist: {
          gatekeeperNetwork: '6MSNwwsuHzv76oXhdx2PGZXyZtB7SzCEof9vKksTMZpE',
          expireOnUse: true,
        },
        payment: {
          paymentAmount: 100000000,
        },
        goLiveSeconds: 1668099600 + 60 * 60,
        endSeconds: 1668099600 + 60 * 120,
      },
      {
        title: 'Phase IV',
        subtitle: 'Public SOL Mint',
        description: '',
        payment: {
          paymentAmount: 150000000,
        },
        goLiveSeconds: 1668099600 + 60 * 120,
      },
    ],
  },
  'test-0': {
    name: 'test-0',
    displayName: 'Test 0',
    description:
      'Basic Attention Token (BAT) has joined forces with Adam Ape, a renowned multidisciplinary artist in Web3 and the traditional graphic design and digital animation space, on its 2500-piece genesis Solana NFT collection: BAT x Adam Ape for Brave.',
    websiteUrl: 'https://cardinal.so',
    socialLinks: [
      {
        icon: 'web',
        link: 'https://google.com/',
      },
      {
        icon: 'twitter',
        link: 'https://google.com',
      },
      {
        icon: 'discord',
        link: 'https://google.com',
      },
    ],
    colors: {
      accent: '#278ace',
      glow: '#278ace',
    },
    candyMachineId: '7oUA5rq31mm2tC5sJMLY3CLSMunVokqmePPj9VBJR5HM',
  },
  unverified: {
    name: 'unverified',
    displayName: 'Beta Testing',
    description:
      'Basic Attention Token (BAT) has joined forces with Adam Ape, a renowned multidisciplinary artist in Web3 and the traditional graphic design and digital animation space, on its 2500-piece genesis Solana NFT collection: BAT x Adam Ape for Brave.',
    websiteUrl: 'https://cardinal.so',
    socialLinks: [
      {
        icon: 'web',
        link: 'https://solanamonkey.business/',
      },
      {
        icon: 'twitter',
        link: 'https://twitter.com/SolanaMBS',
      },
      {
        icon: 'discord',
        link: 'https://discord.com/invite/solanamonkeybusiness',
      },
    ],
    colors: {
      accent: '#278ace',
      glow: '#278ace',
    },
    candyMachineId: '',
  },
}
