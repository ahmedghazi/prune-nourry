import {HiOutlinePaintBrush} from 'react-icons/hi2'
import {defineField} from 'sanity'

export default defineField({
  name: 'moduleArtworks',
  title: 'Artworks UI',
  type: 'object',
  icon: HiOutlinePaintBrush,

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
          type: 'artwork',
        },
      ],
    }),
  ],
})
