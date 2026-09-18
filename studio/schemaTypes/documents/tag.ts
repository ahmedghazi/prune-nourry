import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  fields: [defineField({name: 'title', title: 'Title', type: 'localeString'})],
  preview: {select: {title: `title.${baseLanguage}`, subtitle: 'tagType'}},
})
