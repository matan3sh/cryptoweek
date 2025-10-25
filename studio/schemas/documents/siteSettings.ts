import {defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  // Singleton: Only one document of this type can exist
  // __experimental_actions: ['update', 'publish'], // Removed: no longer supported in current Sanity version
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Main site title (for browser tabs and SEO)',
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Brief description of the site (for SEO)',
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
    },
    {
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords for search engines',
      validation: (Rule) => Rule.max(10),
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seoMetadata',
      description: 'Open Graph and social media metadata',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Logo Text',
          type: 'string',
          description: 'Text logo or company name',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Logo Image',
          type: 'imageAsset',
          description: 'Optional: Logo image',
        },
      ],
    },
    {
      name: 'footer',
      title: 'Footer Information',
      type: 'object',
      fields: [
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          description: 'Copyright holder name',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'year',
          title: 'Copyright Year',
          type: 'number',
          description: 'Year to display in copyright',
          validation: (Rule) => Rule.required().min(2020).max(2030),
          initialValue: new Date().getFullYear(),
        },
        {
          name: 'email',
          title: 'Contact Email',
          type: 'string',
          description: 'Public contact email address',
          validation: (Rule) =>
            Rule.required().email().error('Please enter a valid email address'),
        },
      ],
    },
    {
      name: 'primaryCta',
      title: 'Primary Call to Action',
      type: 'callToAction',
      description: 'Main CTA button displayed in header and hero',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'eventUrl',
      title: 'Event Registration URL',
      type: 'url',
      description: 'URL for event registration or ticket purchase',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    },
    {
      name: 'navigation',
      title: 'Navigation Links',
      type: 'array',
      of: [{type: 'navigationLink'}],
      description: 'Main navigation menu items',
      validation: (Rule) => Rule.max(8),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global site configuration',
      }
    },
  },
})
