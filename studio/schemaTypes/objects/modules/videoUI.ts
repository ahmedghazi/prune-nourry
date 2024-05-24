import {defineField} from 'sanity'
import {FiPlay} from 'react-icons/fi'

export default defineField({
  name: 'moduleVideo',
  title: 'Video',
  type: 'object',
  icon: FiPlay,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title',
    }),
    defineField({
      name: 'embed',
      type: 'embed',
      title: 'Video',
    }),

    // defineField({
    //   name: 'caption',
    //   type: 'localeText',
    //   title: 'Video caption',
    // }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Video',
      }
    },
  },
})
