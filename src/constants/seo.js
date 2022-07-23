export const SEO_DASHBOARD = {
  TITLE: 'Cryptotracker | Dashboard',
  DESCRIPTION: 'Cryptotracker are a new form of electronic money that, unlike well-known cryptocurrencies, are issued by central banks of certain countries. Cryptotracker is an information resource for Cryptotracker with news, updates and technology information.',
  KEYWORDS: 'Cryptotracker, new electronic virtual money, digital money news'
}

export const SEO_NEWS = {
  TITLE: 'Cryptotracker News | Cryptotracker',
  DESCRIPTION: 'Latest news about Cryptotracker (Cryptotracker) around the globe. Announcements and status reports of digital money projects, analytics, technology reviews, forecasts gathered from several sources in one place.',
  KEYWORDS: 'digital currency news, Cryptotracker, central bank virtual money'
}

export const SEO_CURRENCY = {
  TITLE: 'Digital Currency | Cryptotracker',
  TITLE_TEMPLATE: 'Digital Currency | Cryptotracker',
  DESCRIPTION: 'Cryptotracker information',
  KEYWORDS: ''
}

export const SEO_WHATCHLIST = {
  TITLE: 'Watchlist | Cryptotracker',
  DESCRIPTION: 'Watchlist with favourites Digital Currencies',
  KEYWORDS: ''
}

export const SEO_TIMELINE = {
  TITLE: 'Cryptotracker Updates Timeline',
  DESCRIPTION: 'Cryptotracker are a new form of electronic money that, unlike well-known cryptocurrencies, are issued by central banks of certain countries. See the updates timeline of all the world cryptocurrencies in Cryptotracker.',
  KEYWORDS: 'Cryptotracker, Cryptotracker, Cryptotracker, new electronic virtual money, timeline'
}

export const PREVIEW_IMAGE = 'https://Cryptotrackertracker.org/Cryptotracker-splash.jpg'

export const SEO_META_TWITTER = [
  {
    vmid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary'
  },
  {
    vmid: 'twitter:title',
    name: 'twitter:title',
    content: SEO_DASHBOARD.TITLE
  },
  {
    vmid: 'twitter:description',
    name: 'twitter:description',
    content: SEO_DASHBOARD.DESCRIPTION
  },
  {
    vmid: 'twitter:image',
    name: 'twitter:image',
    content: PREVIEW_IMAGE
  }
]

export const SEO_META_OG = [
  {
    vmid: 'og:title',
    name: 'og:title',
    content: SEO_DASHBOARD.TITLE
  },
  {
    vmid: 'og:site_name',
    name: 'og:site_name',
    content: SEO_DASHBOARD.TITLE
  },
  {
    vmid: 'og:type',
    name: 'og:type',
    content: 'website'
  },
  {
    vmid: 'og:description',
    name: 'og:description',
    content: SEO_DASHBOARD.DESCRIPTION
  },
  {
    vmid: 'og:image',
    name: 'og:image',
    content: PREVIEW_IMAGE
  }
]

export const REPLACE_OG_TWITTER_NEWS = [
  {
    vmid: 'twitter:title',
    property: 'twitter:title',
    content: SEO_NEWS.TITLE
  },
  {
    vmid: 'twitter:description',
    property: 'twitter:description',
    content: SEO_NEWS.DESCRIPTION
  },
  {
    vmid: 'og:title',
    property: 'og:title',
    content: SEO_NEWS.TITLE
  },
  {
    vmid: 'og:description',
    property: 'og:description',
    content: SEO_NEWS.DESCRIPTION
  }
]
