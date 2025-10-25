import {defineType} from 'sanity'

export default defineType({
  name: 'seoMetadata',
  title: 'SEO Metadata',
  type: 'object',
  fields: [
    {
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'Full URL of the website (e.g., https://cryptoweek.co.il)',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    },
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'Name of the website for Open Graph',
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: 'locale',
      title: 'Locale',
      type: 'string',
      description: 'Language and region code (e.g., en_US)',
      initialValue: 'en_US',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'object',
      description: 'Image used when sharing on social media',
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'imageAsset',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'width',
          title: 'Width',
          type: 'number',
          description: 'Recommended: 1200px',
          initialValue: 1200,
          validation: (Rule) => Rule.required().min(200),
        },
        {
          name: 'height',
          title: 'Height',
          type: 'number',
          description: 'Recommended: 630px',
          initialValue: 630,
          validation: (Rule) => Rule.required().min(200),
        },
      ],
    },
    {
      name: 'twitterHandle',
      title: 'Twitter Handle',
      type: 'string',
      description: 'Twitter username (with @)',
      validation: (Rule) =>
        Rule.custom((handle) => {
          if (!handle) return true
          return handle.startsWith('@') || 'Twitter handle must start with @'
        }),
    },
  ],
})
