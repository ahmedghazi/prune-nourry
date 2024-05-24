import {defineField} from 'sanity'
import {FiAlignLeft} from 'react-icons/fi'

export default defineField({
  name: 'moduleText',
  title: 'Text',
  type: 'object',
  icon: FiAlignLeft,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
      title: 'Text',
    }),
    defineField({
      type: 'number',
      name: 'width',
      title: 'width',
      description: 'Size in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com',
      initialValue: 12,
      validation: (Rule) => Rule.required().min(1).max(12).warning('from 1 to 12'),
    }),
    defineField({
      type: 'number',
      name: 'offset',
      title: 'Offset',
      description: 'Indent in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0).max(12).warning('from 1 to 12'),
    }),
    defineField({
      type: 'number',
      name: 'columns',
      title: 'columns',
      description: '1 columns text, 2, default 1',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1).max(2).warning('from 1 to 2'),
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
        subtitle: 'Text',
      }
    },
  },
})
