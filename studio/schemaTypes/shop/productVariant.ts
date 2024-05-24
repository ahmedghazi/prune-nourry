import {defineField} from 'sanity'
import {FaShapes} from 'react-icons/fa'
export default defineField({
  title: 'Product variant',
  name: 'productVariant',
  type: 'object',
  icon: FaShapes,

  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    // defineField({
    //   title: 'Weight in grams',
    //   name: 'grams',
    //   type: 'number',
    //   hidden: true,
    // }),
    // defineField({
    //   title: 'Weight in grams',
    //   name: 'weight',
    //   type: 'number',
    // }),
    // defineField({
    //   title: 'Price',
    //   name: 'price',
    //   type: 'number',
    // }),
    defineField({
      name: 'qty',
      title: 'Quantity',
      type: 'number',
    }),
    defineField({
      title: 'SKU',
      name: 'sku',
      type: 'string',
    }),
    defineField({
      title: 'image',
      name: 'image',
      type: 'figure',
    }),

    // defineField({
    //   name: 'images',
    //   title: 'Images',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'image',
    //       options: {
    //         hotspot: true,
    //       },
    //     },
    //   ],
    // }),
    // {
    //   title: 'Bar code',
    //   name: 'barcode',
    //   type: 'barcode',
    // },
  ],
})
