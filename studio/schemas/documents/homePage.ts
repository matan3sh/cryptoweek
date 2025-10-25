import {defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  // Singleton: Only one document of this type can exist
  // __experimental_actions: ['update', 'publish'], // Removed: no longer supported in current Sanity version
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
      description: 'Main hero section at the top of the page',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'aboutSection',
      title: 'About Section',
      type: 'contentSection',
      description: 'About the event section',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'inviteSection',
      title: 'Invite Section',
      type: 'contentSection',
      description: 'Call to action / invitation section',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'partnersTitle',
      title: 'Partners Section Title',
      type: 'string',
      description: 'Title for the partners section',
      initialValue: 'Our Partners',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'partners',
      title: 'Partners',
      type: 'array',
      description: 'Main partners (platinum/gold tier)',
      of: [{type: 'reference', to: [{type: 'company'}]}],
      validation: (Rule) => Rule.max(20),
    },
    {
      name: 'supportersTitle',
      title: 'Supporters Section Title',
      type: 'string',
      description: 'Title for the supporters section',
      initialValue: 'Our Supporters',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'supporters',
      title: 'Supporters',
      type: 'array',
      description: 'Supporting companies',
      of: [{type: 'reference', to: [{type: 'company'}]}],
      validation: (Rule) => Rule.max(50),
    },
    {
      name: 'speakersTitle',
      title: 'Speakers Section Title',
      type: 'string',
      description: 'Title for the speakers section',
      initialValue: 'Speakers',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      description: 'Event speakers',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      validation: (Rule) => Rule.max(100),
    },
    {
      name: 'teamTitle',
      title: 'Team Section Title',
      type: 'string',
      description: 'Title for the team section',
      initialValue: 'Our Team',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'team',
      title: 'Team Members',
      type: 'array',
      description: 'Organizing team members',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      validation: (Rule) => Rule.max(20),
    },
  ],
  preview: {
    select: {
      heroTitle: 'hero.title',
    },
    prepare({heroTitle}) {
      return {
        title: 'Home Page',
        subtitle: heroTitle || 'Configure your home page content',
      }
    },
  },
})
