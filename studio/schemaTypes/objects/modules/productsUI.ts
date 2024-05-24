import {defineField} from 'sanity'
import {ThListIcon} from '@sanity/icons'
import {HiOutlineShoppingBag} from 'react-icons/hi'

export default defineField({
  name: 'moduleProducts',
  title: 'Products',
  type: 'object',
  icon: HiOutlineShoppingBag,
  initialValue: {
    layout: 'mosaic',
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    // defineField({
    //   name: 'layout',
    //   title: 'Style',
    //   type: 'string',
    //   options: {
    //     list: [
    //       {title: 'Mosaic', value: 'mosaic'},
    //       {title: 'Index', value: 'index'},
    //     ], // <-- predefined values
    //     // layout: 'radio', // <-- defaults to 'dropdown'
    //   },
    // }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Products',
      }
    },
  },
})
