import {defineType} from 'sanity'

export default defineType({
  name: 'companyLogo',
  title: 'Company Logo',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo Image',
      type: 'imageAsset',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'displayWidth',
      title: 'Display Width',
      type: 'string',
      description: 'CSS width value (e.g., "120px", "100%")',
      placeholder: '120px',
    },
    {
      name: 'displayHeight',
      title: 'Display Height',
      type: 'string',
      description: 'CSS height value (e.g., "60px", "auto")',
      placeholder: 'auto',
    },
  ],
  preview: {
    select: {
      name: 'name',
      media: 'logo',
    },
    prepare({name, media}) {
      return {
        title: name,
        media: media,
      }
    },
  },
})
