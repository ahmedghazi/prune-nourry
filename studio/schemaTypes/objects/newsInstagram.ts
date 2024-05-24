import {FaInstagram} from 'react-icons/fa'
import {defineField} from 'sanity'

export default defineField({
  name: 'newsInstagram',
  title: 'News Instagram',
  type: 'object',
  icon: FaInstagram,

  fields: [
    defineField({
      name: 'imageCover',
      type: 'image',
      title: 'Image clef',
      description: 'Visible on liste pages, project cards (largeur 1400px)',
      // group: 'editorial',
    }),

    defineField({
      name: 'title',
      type: 'localeString',
      description: '',
    }),
    defineField({
      name: 'excerpt',
      title: 'Texte Extrait',
      type: 'localeBlockContent',
      // group: 'editorial',
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
    }),
    defineField({
      name: 'images',
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
      image: 'imageCover',
      title: 'title.en',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'news',
        media: image,
      }
    },
  },
})
