import {GrGallery} from 'react-icons/gr'
import {defineField} from 'sanity'

export default defineField({
  name: 'moduleExhibitions',
  title: 'Exhibitions UI',
  type: 'object',
  icon: GrGallery,

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
          type: 'exhibition',
        },
      ],
    }),
  ],
})
