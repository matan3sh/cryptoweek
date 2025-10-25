import {defineType} from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Media Link',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Twitter', value: 'twitter'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'GitHub', value: 'github'},
          {title: 'Website', value: 'website'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Full URL to the social media profile',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    },
    {
      name: 'handle',
      title: 'Handle/Username',
      type: 'string',
      description: 'Optional: @username or handle for display',
    },
  ],
  preview: {
    select: {
      platform: 'platform',
      handle: 'handle',
      url: 'url',
    },
    prepare({platform, handle, url}) {
      return {
        title: `${platform}${handle ? ': ' + handle : ''}`,
        subtitle: url,
      }
    },
  },
})
