import {defineField} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export default defineField({
  name: 'moduleVideos',
  title: 'Video(s)',
  type: 'object',
  icon: ThListIcon,
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
          type: 'embed',
        },
      ],
    }),
    defineField({
      name: 'gridSize',
      type: 'number',
      description: 'Number of columns',
      initialValue: 2,
    }),
    // defineField({
    //   name: 'gridType',
    //   type: 'string',
    //   initialValue: 'default',
    //   options: {
    //     list: [
    //       {title: 'Default', value: 'default'},
    //       {title: 'Masonry', value: 'masonry'},
    //     ], // <-- predefined values
    //     layout: 'radio', // <-- defaults to 'dropdown'
    //   },
    // }),
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
        subtitle: 'Video(s)',
        media: image,
      }
    },
  },
})
