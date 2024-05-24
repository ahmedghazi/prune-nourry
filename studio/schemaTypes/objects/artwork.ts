import {HiOutlinePaintBrush} from 'react-icons/hi2'
import {defineField} from 'sanity'

export default defineField({
  name: 'artwork',
  title: 'Artwork',
  type: 'object',
  icon: HiOutlinePaintBrush,

  fields: [
    defineField({
      name: 'image',
      type: 'figure',
      title: 'Image',
    }),
    defineField({
      name: 'title',
      type: 'localeString',
      description: '',
    }),

    defineField({
      name: 'description',
      type: 'localeText',
    }),
    defineField({
      name: 'link',
      type: 'linkInternal',
    }),
  ],
  preview: {
    select: {
      image: 'image.image',
      title: 'title.en',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'artwork',
        media: image,
      }
    },
  },
})
