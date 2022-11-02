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
  badges?: Badge[]
  mintImages?: string[]
  phases?: Phase[]
  candyMachineId?: string
}

export const LISTING_AUTHORITY_NAME = 'global'

export const projectConfigs: { [key: string]: ProjectConfig } = {
  brave: {
    name: 'brave',
    displayName: 'Brave Test',
    description:
      'This is a beta testing collection. Feel free to use at your own risk, these NFTs may or may not be the real verified versions.',
    logoImage: 'brave/brave-logo.png',
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
      accent: '#e74a27',
      glow: '#e74a27',
    },
    mintImages: ['brave/brave-0.png', 'brave/brave-1.png', 'brave/brave-2.png'],
    candyMachineId: '8P1UPnxU1rPKTmMEbneQ2VQW99uLPxboP3QWkgQfuagV',
    phases: [
      {
        tooltip: 'Mint using BAT token',
        title: 'Phase I',
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
        goLiveSeconds: 1667281354,
        endSeconds: 1667281354 + 60 * 60,
      },
      {
        title: 'Phase II',
        subtitle: 'Whitelist SOL Mint',
        description: '',
        allowlist: {
          gatekeeperNetwork: '6MSNwwsuHzv76oXhdx2PGZXyZtB7SzCEof9vKksTMZpE',
          expireOnUse: true,
        },
        payment: {
          paymentAmount: 100000000,
        },
        goLiveSeconds: 1667281354 + 60 * 60,
        endSeconds: 1667281354 + 60 * 120,
      },
      {
        title: 'Phase III',
        subtitle: 'Public SOL Mint',
        description: '',
        goLiveSeconds: 1667281354 + 60 * 60,
        payment: {
          paymentAmount: 150000000,
        },
      },
    ],
  },
  'test-0': {
    name: 'test-0',
    displayName: 'Test 0',
    description:
      'This is a test 0 collection. Feel free to use at your own risk, these NFTs may or may not be the real verified versions. Visit https://marketplace.cardinal.so and request to add a verified collection.',
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
      'This is a beta testing collection. Feel free to use at your own risk, these NFTs may or may not be the real verified versions. Visit https://marketplace.cardinal.so and request to add a verified collection.',
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
