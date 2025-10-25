import {defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: UsersIcon,
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'Full name of the person',
      validation: (Rule) => Rule.required().error('Name is required'),
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'Job title or role (e.g., "CEO", "Speaker", "Team Member")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Person Type',
      type: 'string',
      description: 'Is this person a speaker or team member?',
      options: {
        list: [
          {title: 'Speaker', value: 'speaker'},
          {title: 'Team Member', value: 'team'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'speaker',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company or organization they represent',
    },
    {
      name: 'image',
      title: 'Profile Photo',
      type: 'imageAsset',
      validation: (Rule) => Rule.required().error('Profile photo is required'),
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'Short bio or description',
      rows: 4,
      validation: (Rule) => Rule.max(500),
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{type: 'socialLink'}],
      description: 'Links to social media profiles',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Highlight this person prominently',
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
      title: 'Name (A-Z)',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      company: 'company',
      type: 'type',
      media: 'image',
    },
    prepare({title, subtitle, company, type, media}) {
      return {
        title: title,
        subtitle: `${type === 'speaker' ? '🎤' : '👥'} ${subtitle}${company ? ` @ ${company}` : ''}`,
        media: media,
      }
    },
  },
})
