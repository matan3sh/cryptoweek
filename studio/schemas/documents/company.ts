import {defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export default defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  icon: PackageIcon,
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      description: 'Full name of the company',
      validation: (Rule) => Rule.required().error('Company name is required'),
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'imageAsset',
      description: 'Company logo image',
      validation: (Rule) => Rule.required().error('Logo is required'),
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url',
      description: 'Company website',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    },
    {
      name: 'tier',
      title: 'Sponsorship Tier',
      type: 'string',
      description: 'Level of sponsorship or partnership',
      options: {
        list: [
          {title: 'Platinum Partner', value: 'platinum'},
          {title: 'Gold Partner', value: 'gold'},
          {title: 'Silver Partner', value: 'silver'},
          {title: 'Supporter', value: 'supporter'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description of the company',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display prominently (e.g., in hero section)',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (lower numbers appear first)',
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Tier (Platinum First)',
      name: 'tierDesc',
      by: [{field: 'tier', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      tier: 'tier',
      featured: 'featured',
      media: 'logo',
    },
    prepare({title, tier, featured, media}) {
      const tierEmojis: Record<string, string> = {
        platinum: '⭐',
        gold: '🥇',
        silver: '🥈',
        supporter: '🤝',
      }
      const tierEmoji = tierEmojis[tier] || '🏢'

      return {
        title: title,
        subtitle: `${tierEmoji} ${tier}${featured ? ' • Featured' : ''}`,
        media: media,
      }
    },
  },
})
