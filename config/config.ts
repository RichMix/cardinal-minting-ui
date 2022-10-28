import type { IconKey } from 'common/Socials'

export type Colors = {
  accent: string
  glow: string
}

export type Badge = {
  badgeType: 'recent' | 'trending' | 'expiration' | 'wrapped' | 'unwrapped'
  position?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'
  content?: JSX.Element | string
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
  logoImage: string
  logoPadding?: boolean
  colors: Colors
  badges?: Badge[]
  candyMachineId?: string
}

export const LISTING_AUTHORITY_NAME = 'global'

export const projectConfigs: { [key: string]: ProjectConfig } = {
  brave: {
    name: 'brave',
    displayName: 'Brave Test',
    description:
      'This is a beta testing collection. Feel free to use at your own risk, these NFTs may or may not be the real verified versions.',
    logoImage: 'logos/brave-logo.png',
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
    candyMachineId: '5FHQgZQ4URxE6F1Kousn1EuZpPQdaJHyXgVvmfnyCZxJ',
  },
  unverified: {
    name: 'unverified',
    displayName: 'Beta Testing',
    description:
      'This is a beta testing collection. Feel free to use at your own risk, these NFTs may or may not be the real verified versions. Visit https://marketplace.cardinal.so and request to add a verified collection.',
    logoImage: 'logos/default.png',
    hero: 'logos/default-hero.png',
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
