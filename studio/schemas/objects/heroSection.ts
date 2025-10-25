import {defineType} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Small text above the main title',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'Large main heading',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'titleHighlight',
      title: 'Title Highlight Word',
      type: 'string',
      description: 'Part of the title to highlight (e.g., "Week" in "CryptoWeek")',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Tagline or short description',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Longer description text',
      rows: 4,
      validation: (Rule) => Rule.max(500),
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'imageAsset',
      description: 'Hero background image',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'imageAsset',
      description: 'Optional foreground/feature image',
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'callToAction',
      description: 'Primary action button',
    },
    {
      name: 'featuredPartners',
      title: 'Featured Partners',
      type: 'array',
      description: 'Logos of featured partners to display in hero',
      of: [{type: 'companyLogo'}],
      validation: (Rule) => Rule.max(10),
    },
  ],
  preview: {
    select: {
      headline: 'headline',
      title: 'title',
    },
    prepare({headline, title}) {
      return {
        title: title,
        subtitle: headline,
      }
    },
  },
})
