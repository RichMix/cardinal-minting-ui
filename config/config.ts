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
    candyMachineId: 'Cdx5bmrwdYicFHVAgS5hXFmvhtCvLSXkZwzniuDC52dW',
    phases: [
      {
        tooltip: 'Mint using BAT token',
        title: 'Phase I',
        subtitle: 'Whitelist BAT Mint',
        description: '',
        payment: {
          paymentMint: 'EPeUFDgHRxs9xxEPVaL6kfGQvCon7jmAWKVUHuux1Tpz',
          paymentAmount: 20000000000,
        },
        goLiveSeconds: 1667200273 - 60 * 40,
        endSeconds: 1667200273,
      },
      {
        title: 'Phase II',
        subtitle: 'Whitelist SOL Mint',
        description: '',
        payment: {
          paymentAmount: 1500000000,
        },
        endSeconds: 1667200273 + 60 * 50,
      },
      {
        title: 'Phase III',
        subtitle: 'Public SOL Mint',
        description: '',
        goLiveSeconds: 1667200273 + 60 * 50,
        payment: {
          paymentAmount: 2000000000,
        },
      },
    ],
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
