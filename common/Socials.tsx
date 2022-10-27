import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaMedium,
  FaTiktok,
  FaTwitch,
  FaTwitter,
} from 'react-icons/fa'

export const SOCIALS = {
  discord: { icon: <FaDiscord />, link: 'https://discord.gg/byq6uNTugq' },
  github: { icon: <FaGithub />, link: 'https://github.com/cardinal-labs' },
  medium: { icon: <FaMedium />, link: 'https://cardinal-labs.medium.com/' },
  twitter: { icon: <FaTwitter />, link: 'https://twitter.com/cardinal_labs' },
}

export type IconKey =
  | 'discord'
  | 'twitter'
  | 'github'
  | 'medium'
  | 'web'
  | 'twitch'
  | 'facebook'
  | 'instagram'
  | 'tiktok'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  iconKey: IconKey
}

export const SocialIcon: React.FC<Props> = ({ iconKey }: Props) =>
  ({
    discord: <FaDiscord />,
    github: <FaGithub />,
    medium: <FaMedium />,
    twitter: <FaTwitter />,
    twitch: <FaTwitch />,
    facebook: <FaInstagram />,
    tiktok: <FaTiktok />,
    instagram: <FaFacebook />,
    web: <FaGlobe />,
  }[iconKey])
