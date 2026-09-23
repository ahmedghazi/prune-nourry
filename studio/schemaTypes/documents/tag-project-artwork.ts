import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineType({
  name: 'tagProjectArtwork',
  title: 'Tag Project Artwork',
  description: 'Tag to link Project and Artwork',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL basée sur le titre (sans espace ni caractère autre que a-z-0-9',
      options: {
        source: `title.${baseLanguage}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      // subtitle: 'tagType',
    },
  },
})
