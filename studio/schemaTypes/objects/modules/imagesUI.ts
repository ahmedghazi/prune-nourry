import {defineField} from 'sanity'
import {BiImages} from 'react-icons/bi'

export default defineField({
  name: 'moduleImages',
  title: 'Image(s)',
  type: 'object',
  icon: BiImages,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'figure',
        },
      ],
    }),
    defineField({
      name: 'gridSize',
      type: 'number',
      description: 'Number of columns',
      initialValue: 4,
    }),
    defineField({
      name: 'gridType',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Masonry', value: 'masonry'},
        ], // <-- predefined values
        layout: 'radio', // <-- defaults to 'dropdown'
      },
    }),
  ],

  preview: {
    select: {
      image: 'items.0',
      title: 'title',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Image(s)',
        media: image,
      }
    },
  },
})
