import {defineType} from 'sanity'

export default defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      description: 'Text displayed on the button',
      validation: (Rule) => Rule.required().max(50).error('Keep button text under 50 characters'),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link destination',
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
    {
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      description: 'Open link in a new browser tab',
      initialValue: false,
    },
    {
      name: 'style',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Outline', value: 'outline'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    },
  ],
  preview: {
    select: {
      text: 'text',
      url: 'url',
      style: 'style',
    },
    prepare({text, url, style}) {
      return {
        title: text,
        subtitle: `${style || 'primary'} → ${url}`,
      }
    },
  },
})
