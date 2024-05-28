import {FaInstagram} from 'react-icons/fa'
import {defineField} from 'sanity'

export default defineField({
  name: 'slideProject',
  title: 'Slide Project',
  type: 'object',
  icon: FaInstagram,

  fields: [
    defineField({
      name: 'image',
      type: 'figure',
    }),

    defineField({
      name: 'link',
      // title: 'Link on click on the slider',
      type: 'reference',
      weak: true,
      to: [{type: 'project'}],
      // group: 'editorial',
    }),
  ],
  preview: {
    select: {
      media: 'image.image',
      // title: 'title.en',
    },
    // prepare(selection) {
    //   const {title, image} = selection
    //   return {
    //     title: title,
    //     subtitle: 'news',
    //     media: image,
    //   }
    // },
  },
})
