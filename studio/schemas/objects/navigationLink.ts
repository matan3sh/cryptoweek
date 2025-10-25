import {defineType} from 'sanity'

export default defineType({
  name: 'navigationLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Link Text',
      type: 'string',
      description: 'Text displayed in navigation',
      validation: (Rule) => Rule.required().max(30),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Link destination (can be anchor like #Speakers or full URL)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      description: 'Open link in a new browser tab',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({title, url}) {
      return {
        title: title,
        subtitle: url,
      }
    },
  },
})
