import {defineField, defineArrayMember, defineType} from 'sanity'
import {FolderIcon} from '@sanity/icons'
import modulesList from '../objects/modules/modulesList'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineType({
  type: 'document',
  name: 'artwork',
  title: 'Artwork',
  icon: FolderIcon,
  groups: [
    {
      // default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      return fields && fields.seo ? true : 'SEO needed'
    }),
  preview: {
    select: {
      title: 'seo.metaTitle',
      subtitle: 'seo.metaDescription',
      media: 'seo.metaImage',
    },
  },

  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Titre',
      group: 'editorial',
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
      group: 'editorial',
    }),
    defineField({
      name: 'tagProjectArtwork',
      title: 'Tag Project Artwork',
      type: 'reference',
      to: [{type: 'tagProjectArtwork'}],
      group: 'editorial',
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Descrition',
      group: 'editorial',
      // hidden: true,
    }),
    defineField({
      name: 'imageCover',
      type: 'image',
      title: 'Image clef',
      description: 'Visible on liste pages, project cards (largeur 1400px)',
      group: 'editorial',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'figure'}],
      options: {
        layout: 'grid',
      },
      group: 'editorial',
    }),
    // defineField({
    //   name: 'excerpt',
    //   title: 'Texte Extrait',
    //   type: 'localeBlockContent',
    //   group: 'editorial',
    // }),
    defineField({
      name: 'text',
      title: 'Texte',
      type: 'localeBlockContent',
      group: 'editorial',
    }),
    // defineField({
    //   name: 'credits',
    //   title: 'Crédits',
    //   type: 'localeBlockContent',
    //   group: 'editorial',
    // }),

    defineField({
      name: 'link',
      description: 'Internal',
      type: 'linkInternal',
      group: 'editorial',
    }),
  ],
})
