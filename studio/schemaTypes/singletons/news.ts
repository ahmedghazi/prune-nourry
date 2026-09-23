import {defineField, defineType} from 'sanity'
import modulesList from '../objects/modules/modulesList'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  icon: InfoOutlineIcon,
  validation: (Rule) =>
    Rule.custom((fields) => {
      return fields && fields.seo ? true : 'SEO needed'
    }),
  preview: {
    select: {title: 'seo.metaTitle', subtitle: 'seo.metaDescription', media: 'seo.metaImage'},
  },
  groups: [
    {default: true, name: 'editorial', title: 'Editorial'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'seo', type: 'seo', group: 'seo'}),

    defineField({name: 'title', title: 'Title', type: 'localeString', group: 'editorial'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL based on the title (no space, or char other than a-z-0-9',
      options: {source: `title.${baseLanguage}`, maxLength: 96},
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),

    defineField({
      name: 'items',
      title: 'Instagram posts',
      type: 'array',
      of: [{type: 'newsInstagram'}],
      group: 'editorial',
    }),
  ],
})
