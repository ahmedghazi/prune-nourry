import {GrGallery} from 'react-icons/gr'
import {defineField} from 'sanity'

export default defineField({
  name: 'exhibition',
  title: 'Exhibition',
  type: 'object',
  icon: GrGallery,

  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      description: '',
    }),

    defineField({
      name: 'text',
      type: 'localeBlockContent',
    }),
    defineField({
      name: 'slider',
      type: 'array',
      of: [
        {
          type: 'figure',
        },
      ],
    }),
  ],
  preview: {
    select: {
      image: 'slider.0.image',
      title: 'title.en',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Exhibition',
        media: image,
      }
    },
  },
})
