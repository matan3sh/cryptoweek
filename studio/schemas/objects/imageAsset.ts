import {defineType} from 'sanity'

export default defineType({
  name: 'imageAsset',
  title: 'Image Asset',
  type: 'image',
  options: {
    hotspot: true, // Enables image cropping and focal point selection
  },
  fields: [
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility',
      validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption for the image',
    },
  ],
})
