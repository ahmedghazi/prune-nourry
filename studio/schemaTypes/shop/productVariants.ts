import {defineField} from 'sanity'
import {FaShapes} from 'react-icons/fa'
export default defineField({
  title: 'Product variants',
  name: 'productVariants',
  type: 'object',
  icon: FaShapes,
  preview: {
    select: {
      title: 'title.en',
    },
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'localeString',
    }),
    defineField({
      name: 'items',
      title: 'Variant',
      type: 'array',
      of: [
        {
          type: 'productVariant',
        },
      ],
    }),
  ],
})
