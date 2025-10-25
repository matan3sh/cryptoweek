import type {
  FeaturePartner,
  HeaderLink,
  SectionData,
  SpeakerData,
  TeamMember,
} from '@/types'

export const about: SectionData = {
  title:
    'New to cryptocurrency? No problem. Digital assets are here to stay, join us to learn & connect.',
  subtitle:
    "We're showcasing the best crypto companies, leaders on one Coin Nations Global Summit",
  color: '#3f354d',
  bg: '/static/images/about/bg.png',
}

export const invite: SectionData = {
  title:
    'Coin Nations Summit invites you to discover a whole new world of crypto possibilities.',
  subtitle:
    'Trading digital assets is changing the way the world thinks about money and finance. Join the best 2021 Coin Nations Summit to take part in the new world economy.',
  color: '#fff',
  bg: '/static/images/invite/bg.png',
}

export const ourPartnersData: string[] = [
  '/images/our_partners/visa.png',
  '/images/our_partners/circle.jpeg',
  '/images/our_partners/Nuvei.png',
  '/images/our_supporters/black-mp-logo.png',
  '/images/our_partners/celsius.png',
]

export const ourSupportersData: string[] = [
  '/images/our_supporters/MoonWhiteOnBlackSquare.png',
  '/images/our_supporters/Draper.png',
  '/images/our_supporters/simetria.io.png',
  '/images/our_supporters/CM_Logo.png',
  '/images/our_supporters/BCB-GROUP-LOGO-BLUE-RGB.png',
  '/images/our_supporters/Blockchain_BLUE_BG.png',
  '/images/our_supporters/FF_LogoFinal_Black5-optimized.png',
  '/images/our_supporters/ZenGo_Logo.png',
  '/images/our_supporters/Simplex_logo.png',
  '/images/our_supporters/IMG_9649.jpg',
  '/images/our_supporters/blockchain_founder_fund.png',
  '/images/our_supporters/Whub.jpeg',
  '/images/our_supporters/amber.png',
  '/images/our_supporters/ConsenSys.png',
  '/images/our_supporters/nash.png',
  '/images/our_supporters/Niftys.png',
  '/images/our_supporters/UniqueNetworkLogo.svg',
  '/images/our_supporters/gk8_logo.jpg',
  '/images/our_supporters/fuse_logo.svg',
  '/images/our_supporters/black-mp-logo.png',
  '/images/our_supporters/Flagship_logo.png',
  '/images/our_supporters/The_Paypers_logo.png',
  '/images/our_supporters/Cheeze.png',
  '/images/our_supporters/token_bay_logo.png',
  '/images/our_supporters/GLOZAL.png',
  '/images/our_supporters/SuperWorld.png',
  '/images/our_supporters/bitcoin.png',
  '/images/our_supporters/GMG-logos.jpeg',
  '/images/our_supporters/logo_splinterlands_characters_beta_1200.png',
  '/images/our_supporters/CryptoCanal.png',
  '/images/our_supporters/Blockdata_logoFINAL.png',
  '/images/our_supporters/flow_logo.png',
  '/images/our_supporters/BIS.jpg',
  '/images/our_supporters/bitpay.png',
  '/images/our_supporters/coinbase-in.png',
  '/images/our_supporters/Crypto.com_Blue stacked.png',
  '/images/our_supporters/BAS_logo_FA_-Horizontal_RGB-Web.png',
  '/images/our_supporters/etoro.jpeg',
  '/images/our_supporters/H_Logomark_Lockup_black.png',
]

export const ourSpeakersData: SpeakerData[] = [
  {
    name: 'Catherine Gu',
    image: '/images/our_speakers/Catherine_Gu.png',
    role: 'Global CBDC Lead at Visa',
  },
  {
    name: 'Tim Draper',
    image: '/images/our_speakers/Tim_Draper.png',
    role: 'Founder, Draper Associates, DFJ, and Draper University.',
  },
  {
    name: 'Nikola Plecas',
    image: '/images/our_speakers/Nikola_Plecas.png',
    role: 'Director, Crypto Solutions, Europe, Visa',
  },
  {
    name: 'Raj Parekh',
    image: '/images/our_speakers/Raj_Parekh.png',
    role: 'Director of Global Crypto Products at Visa',
  },
  {
    name: 'AJ Shanley',
    image: '/images/our_speakers/AJ_Shanley.png',
    role: 'VP and Head of Crypto Solutions & Operations at Visa',
  },
  {
    name: 'Dante Disparte',
    image: '/images/our_speakers/Dante_Disparte.png',
    role: 'Chief Strategy Officer and Head of Global Policy at Circle',
  },
  {
    name: 'Chris Aruliah',
    image: '/images/our_speakers/Chris_Aruliah.png',
    role: 'Chief Product Officer - BCB Group',
  },
  {
    name: 'Ken Kruger',
    image: '/images/our_speakers/Ken_Kruger.png',
    role: 'Founder & CEO - Moon',
  },
  {
    name: 'Alex Mashinsky',
    image: '/images/our_speakers/Alex_Mashinsky.png',
    role: 'Founder and CEO, Celsius',
  },
  {
    name: 'Lou Kerner',
    image: '/images/our_speakers/Lou.png',
    role: 'Partner, Blockchain Coinvestors',
  },
  {
    name: 'Dr. Oriol Caudevilla',
    image: '/images/our_speakers/oriol.jpg',
    role: 'Management and Strategy Consultant, FinTech Advisor',
  },
  {
    name: 'Alex Adelman',
    image: '/images/our_speakers/Alex_Adelman.png',
    role: 'CEO and Co-founder Lolli',
  },
  {
    name: 'Joshua Johnson',
    image: '/images/our_speakers/Joshua_Johnson.png',
    role: 'Founder and CEO Financial InterNetWork',
  },
  {
    name: 'Joseph Langenbrunner',
    image: '/images/our_speakers/Joseph_Langenbrunner.png',
    role: 'Deputy Head of Mission to The United States of America for The Republic of Liberland',
  },
  {
    name: 'Kirsten Collins',
    image: '/images/our_speakers/Kirsten_Collins.png',
    role: 'NFT Artist, Music Artist, Singer Song-Writer, Social Media Influencer, Actress, Model',
  },
  {
    name: 'Yael Tamar',
    image: '/images/our_speakers/Yael_Tamar.png',
    role: 'Co-CEO and Co-founder SolidBlock',
  },
  {
    name: 'Ilan Steiner',
    image: '/images/our_speakers/Ilan_Steiner.png',
    role: 'COO Simetria',
  },
  {
    name: 'Alexander Barabanov',
    image: '/images/our_speakers/Alexander_Barabanov.png',
    role: 'Co-founder, CEO at Unique',
  },
  {
    name: 'Syed Musheer Ahmed',
    image: '/images/our_speakers/Syed_Musheer_Ahmed.png',
    role: 'Founder & MD at Finstep Asia',
  },
  {
    name: 'Lior Lamesh',
    image: '/images/our_speakers/Lior_Lamesh.png',
    role: 'Co-Founder and CEO at GK8',
  },
  {
    name: 'Ivan Soto-Wright',
    image: '/images/our_speakers/Ivan_Soto-Wright.png',
    role: 'Co-Founder & CEO at MoonPay',
  },
  {
    name: 'Lucy Gazmararian',
    image: '/images/our_speakers/Lucy_Gazmararian.png',
    role: 'Founder & Managing Partner at Token Bay Capital',
  },
  {
    name: 'Gilat Alon Shemesh',
    image: '/images/our_speakers/Gilat_Alon_Shemesh.png',
    role: 'Wingate Asset Management',
  },
  {
    name: 'Mélisande Mual',
    image: '/images/our_speakers/Melisande_Mual.png',
    role: 'Publisher of The Paypers',
  },
  {
    name: 'Joel Van Arsdale',
    image: '/images/our_speakers/Joel_Van_Arsdale.png',
    role: 'Managing Partner at Flagship Advisory Partners',
  },
  {
    name: 'Simon Hudson',
    image: '/images/our_speakers/Simon_Hudson.png',
    role: 'CEO at Cheeze',
  },
  {
    name: 'Tarek Kirschen',
    image: '/images/our_speakers/Tarek_Kirschen.png',
    role: 'Founder & CEO at GLOZAL',
  },
  {
    name: 'Hrish Lotlikar',
    image: '/images/our_speakers/Hrish_Lotlikar.png',
    role: 'Co-Founder & CEO at SuperWorld',
  },
  {
    name: 'David Berkowitz',
    image: '/images/our_speakers/David_Berkowitz.png',
    role: 'CMO Coin Creator & Serial Marketers community',
  },
  {
    name: 'Jesse "Aggroed" Reich',
    image: '/images/our_speakers/Jesse_Aggroed_Reich.png',
    role: 'Founder Splinterlands',
  },
  {
    name: 'Bored Elon',
    image: '/images/our_speakers/Bored_Elon_Musk.png',
    role: '@BoredElonMusk',
  },
  {
    name: 'Jonathan Knegtel',
    image: '/images/our_speakers/Jonathan_Knegtel.png',
    role: 'Co-founder & General Manager of Blockdata',
  },
  {
    name: 'Wei Yu',
    image: '/images/our_speakers/Wei_Yu.png',
    role: 'Head of Marketing at Flow',
  },
  {
    name: 'Cory Klippsten',
    image: '/images/our_speakers/Cory_Klippsten.png',
    role: 'Founder and CEO at Swan Bitcoin',
  },
  {
    name: 'Cameron Chell',
    image: '/images/our_speakers/Cameron_Chell.png',
    role: 'Executive Chairman - CurrencyWorks Co-Head - VUELE',
  },
  {
    name: 'Ben Samaroo',
    image: '/images/our_speakers/Ben_Samaroo.png',
    role: 'Co-Founder and CEO at WonderFi',
  },
  {
    name: 'Christopher Torres',
    image: '/images/our_speakers/Christopher_Torres.png',
    role: 'Artist at Nyan Cat',
  },
  {
    name: 'Asher Westropp-Evans',
    image: '/images/our_speakers/Asher_Westropp-Evans.png',
    role: 'Story Producer & Co-Host at Coins',
  },
  {
    name: 'Merrick Theobald',
    image: '/images/our_speakers/Merrick_Theobald.png',
    role: 'VP of Marketing at BitPay',
  },
  {
    name: 'Ben Floyd',
    image: '/images/our_speakers/Ben_Floyd.png',
    role: 'Head of Execution Services at Coinbase Institutional',
  },
  {
    name: 'Volen Tsolov',
    image: '/images/our_speakers/Volen_Tsolov.png',
    role: 'COO at GLOZAL, Inc',
  },
  {
    name: 'Eric Anziani',
    image: '/images/our_speakers/Eric_Anziani.png',
    role: 'Chief Operating Officer at Crypto.com',
  },
  {
    name: 'Daniel Eidan',
    image: '/images/our_speakers/Daniel_Eidan.png',
    role: 'Adviser and Solution Architect at the Bank for International Settlements (BIS)',
  },
  {
    name: 'Karena Belin',
    image: '/images/our_speakers/Karena_Belin.png',
    role: 'Karena Belin, Co-founder & CEO WHub',
  },
  {
    name: 'Chia Hock Lai',
    image: '/images/our_speakers/Chia_Hock_Lai.png',
    role: 'Co-chairman Blockchain Association Singapore',
  },
  {
    name: 'Brad Michelson',
    image: '/images/our_speakers/Brad_Michelson.png',
    role: 'Head of US Digital Assets Marketing at eToro',
  },
  {
    name: 'Jordan Fried',
    image: '/images/our_speakers/Jordan_Fried.png',
    role: 'Chairman & CEO of Immutable Holdings',
  },
]

export const ourTeamData: TeamMember[] = [
  {
    name: 'Nir Kouris',
    image:
      '/images/our_team/136333043_684932272198707_4010410310317845982_n.jpg',
    role: 'Founder of Coin Nations',
  },
  {
    name: 'Shahar Ami Mizrahi',
    image: '/images/our_team/Shahar_Ami_Mizrahi.jpg',
    role: 'Technology Guru',
  },
  {
    name: 'Ignacio Agramont',
    image:
      '/images/our_team/136158881_872894413470639_7092431772786744317_n.jpg',
    role: 'Hackathon Manager',
  },
  {
    name: 'Matan Shaviro',
    image: '/images/our_team/Matan_Shaviro.png',
    role: 'Full Stack Developer - Coin Nations',
  },
  {
    name: 'Ivan Sangueza Alarcon',
    image: '/images/our_team/Ivan.png',
    role: 'Video Manager - Coin Nations',
  },
]

export const headerLinks: HeaderLink[] = [
  { title: 'Speakers', link: '#Speakers' },
  { title: 'Discord', link: '#Discord' },
]

export const featurPartners: FeaturePartner[] = [
  { name: 'WeDiggIT', height: '45px', width: '242px' },
  { name: 'Celsius', height: '38px', width: '165px' },
  { name: 'Digital_Bank', height: '44px', width: '113px' },
  { name: 'ZenGo', height: '52px', width: '121px' },
]
