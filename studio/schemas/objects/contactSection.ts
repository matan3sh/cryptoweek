import {defineType} from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main heading for the contact section',
      validation: (Rule) => Rule.required().max(50),
      initialValue: 'Contact',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description text below the title',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'fieldLabels',
      title: 'Form Field Labels',
      type: 'object',
      description: 'Placeholder text for each form field',
      fields: [
        {
          name: 'firstName',
          title: 'First Name Placeholder',
          type: 'string',
          initialValue: 'First Name',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'lastName',
          title: 'Last Name Placeholder',
          type: 'string',
          initialValue: 'Last Name',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'email',
          title: 'Email Placeholder',
          type: 'string',
          initialValue: 'Email',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'company',
          title: 'Company Placeholder',
          type: 'string',
          initialValue: 'Company',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'message',
          title: 'Message Placeholder',
          type: 'string',
          initialValue: 'Message',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'buttonText',
      title: 'Submit Button Text',
      type: 'object',
      fields: [
        {
          name: 'default',
          title: 'Default Text',
          type: 'string',
          initialValue: 'Send',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'submitting',
          title: 'Submitting Text',
          type: 'string',
          initialValue: 'Sending...',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'messages',
      title: 'Response Messages',
      type: 'object',
      fields: [
        {
          name: 'success',
          title: 'Success Message',
          type: 'string',
          initialValue: "We've got your message!",
          validation: (Rule) => Rule.required().max(100),
        },
        {
          name: 'error',
          title: 'Error Message',
          type: 'string',
          initialValue: 'Failed to send message. Please try again.',
          validation: (Rule) => Rule.required().max(100),
        },
        {
          name: 'rateLimitError',
          title: 'Rate Limit Error Message',
          type: 'string',
          initialValue: 'Too many requests. Please try again later.',
          validation: (Rule) => Rule.required().max(100),
        },
      ],
    },
    {
      name: 'validationMessages',
      title: 'Validation Error Messages',
      type: 'object',
      description: 'Error messages shown when fields are invalid',
      fields: [
        {
          name: 'firstNameRequired',
          title: 'First Name Required',
          type: 'string',
          initialValue: 'First name is required',
        },
        {
          name: 'lastNameRequired',
          title: 'Last Name Required',
          type: 'string',
          initialValue: 'Last name is required',
        },
        {
          name: 'emailRequired',
          title: 'Email Required',
          type: 'string',
          initialValue: 'Email is required',
        },
        {
          name: 'emailInvalid',
          title: 'Email Invalid',
          type: 'string',
          initialValue: 'Please enter a valid email address',
        },
        {
          name: 'messageRequired',
          title: 'Message Required',
          type: 'string',
          initialValue: 'Message is required',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Contact Section',
        subtitle: 'Contact form configuration',
      }
    },
  },
})
