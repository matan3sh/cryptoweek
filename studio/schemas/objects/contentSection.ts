import {defineType} from 'sanity'

export default defineType({
  name: 'contentSection',
  title: 'Content Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Section heading',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Section description or tagline',
      rows: 3,
      validation: (Rule) => Rule.required().max(500),
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'string',
      description: 'Visual theme for the section',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'imageAsset',
      description: 'Optional background image for the section',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      theme: 'theme',
    },
    prepare({title, subtitle, theme}) {
      return {
        title: title,
        subtitle: `${theme} - ${subtitle?.substring(0, 60)}...`,
      }
    },
  },
})
