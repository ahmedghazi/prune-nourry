import {defineType, defineField} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'
import modulesList from '../objects/modules/modulesList'
import {baseLanguage} from '../locale/supportedLanguages'
// console.log(modulesList)

export default defineType({
  name: 'home',
  type: 'document',
  title: 'Home',
  icon: HomeIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
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
      name: 'link',
      title: 'Link on click on the slider',
      type: 'reference',
      weak: true,
      to: [
        {type: 'pageModulaire'},
        {type: 'project'},
        {type: 'home'},
        {type: 'infos'},
        {type: 'news'},
      ],
      group: 'editorial',
    }),
    defineField({
      name: 'slider',
      title: 'Slider',
      type: 'array',
      of: [{type: 'slideProject'}],
      group: 'editorial',
    }),
    defineField({
      name: 'projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}],
        },
      ],
      group: 'editorial',
    }),
  ],
  preview: {
    prepare() {
      return {
        subtitle: '/',
        title: 'Home',
      }
    },
  },
})
