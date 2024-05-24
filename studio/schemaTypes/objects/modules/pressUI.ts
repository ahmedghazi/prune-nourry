import {IoNewspaperOutline} from 'react-icons/io5'
import {defineField} from 'sanity'

export default defineField({
  name: 'modulePress',
  title: 'Press UI',
  type: 'object',
  icon: IoNewspaperOutline,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'newsArticle',
        },
      ],
    }),
  ],
})
