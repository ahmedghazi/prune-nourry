import {HiOutlinePaintBrush} from 'react-icons/hi2'
import {defineField} from 'sanity'

export default defineField({
  name: 'newsArticle',
  title: 'News Article',
  type: 'object',
  icon: HiOutlinePaintBrush,

  fields: [
    defineField({
      name: 'image',
      type: 'figure',
      title: 'Image',
    }),
    defineField({
      name: 'date',
      type: 'date',
    }),
    defineField({
      name: 'title',
      type: 'localeString',
      description: '',
    }),
    defineField({
      name: 'link',
      type: 'linkExternal',
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
        subtitle: 'news',
        media: image,
      }
    },
  },
})
