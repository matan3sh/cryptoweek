import {defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submissions',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      readOnly: true,
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
      readOnly: true,
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      description: 'IP address of the submitter (for spam prevention)',
      readOnly: true,
    },
    {
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      description: 'Browser/device information',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Read', value: 'read'},
          {title: 'Replied', value: 'replied'},
          {title: 'Spam', value: 'spam'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes about this submission',
      rows: 3,
    },
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
    {
      title: 'Oldest First',
      name: 'oldestFirst',
      by: [{field: 'submittedAt', direction: 'asc'}],
    },
    {
      title: 'Status',
      name: 'statusOrder',
      by: [
        {field: 'status', direction: 'asc'},
        {field: 'submittedAt', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      company: 'company',
      submittedAt: 'submittedAt',
      status: 'status',
    },
    prepare({firstName, lastName, email, company, submittedAt, status}) {
      const statusEmoji = {
        new: '🆕',
        read: '👁️',
        replied: '✅',
        spam: '🚫',
        archived: '📦',
      }[status] || '📧'

      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : 'Unknown'

      return {
        title: `${statusEmoji} ${firstName} ${lastName}`,
        subtitle: `${email}${company ? ` - ${company}` : ''} | ${date}`,
      }
    },
  },
})
