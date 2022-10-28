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
  goLiveSeconds?: number
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
    candyMachineId: '5FHQgZQ4URxE6F1Kousn1EuZpPQdaJHyXgVvmfnyCZxJ',
    phases: [
      {
        tooltip: 'Mint using BAT token',
        title: 'Phase I',
        subtitle: 'BAT Mint',
        description: '200 BAT',
      },
      {
        title: 'Phase II',
        subtitle: 'Public SOL Mint',
        description: '2.5 SOL',
        goLiveSeconds: 1667082530,
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
