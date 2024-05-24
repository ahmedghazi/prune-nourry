import {defineField, defineType} from 'sanity'
import {HiOutlineShoppingBag} from 'react-icons/hi'
import {baseLanguage} from '../locale/supportedLanguages'
import {client} from '../../sanity-client'
// import {baseLanguage} from '../locale/supportedLanguages'

const isUniqueSKU = async (sku: string | any, context: any) => {
  const {document} = context

  const id = document._id.replace(/^drafts\./, '')

  const params = {
    draft: `drafts.${id}`,
    published: id,
    sku: sku,
  }

  /* groq */
  const query = `!defined(*[
    _type == 'product' &&
    !(_id in [$draft, $published]) &&
    sku == $sku
  ][0]._id)`

  return client.fetch(query, params)
}

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: HiOutlineShoppingBag,
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
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'shop',
      title: 'Shop',
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
      title: 'Title',
      type: 'localeString',
      group: 'editorial',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL based on the title (no space, or char other than a-z-0-9',
      options: {
        source: `title.${baseLanguage}`,
        maxLength: 96,
      },
      group: 'editorial',
    }),

    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'reference',
      to: {type: 'tag'},
      group: 'editorial',
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

    defineField({
      name: 'price',
      title: 'Prix',
      type: 'number',
      description: 'Prix par défaut si pas de variants',
      group: 'shop',
    }),
    defineField({
      name: 'priceCrossed',
      title: 'Prix barré',
      type: 'number',
      // description: 'Prix réduit',
      group: 'shop',
    }),
    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'number',
      description: 'Weight in grams',
      group: 'shop',
    }),
    defineField({
      name: 'tax',
      title: 'Tax name',
      type: 'string',
      description: 'from snipcart > taxes',
      group: 'shop',
    }),
    // defineField({
    //   name: 'qty',
    //   title: 'Quantity',
    //   type: 'number',
    //   description: '',
    //   group: 'shop',
    // }),
    defineField({
      title: 'SKU',
      name: 'sku',
      type: 'string',
      group: 'shop',
      description: 'default sku if no variants',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const isUnique = await isUniqueSKU(value, context)
          if (!isUnique) return 'SKU is already used'
          return true
        }),
    }),

    // defineField({
    //   title: 'Product variants',
    //   name: 'variants',
    //   type: 'array',
    //   description: 'ex CD/LP ou S/M/L ou Color',
    //   of: [
    //     {
    //       title: 'Variants',
    //       type: 'productVariants',
    //     },
    //   ],
    //   group: 'editorial',
    // }),

    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'localeText',
      description:
        'description courte pour le shop (Black vinyl - shiny cover - black innersleeve)',
      group: 'editorial',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'localeBlockContent',
      group: 'editorial',
    }),

    defineField({
      name: 'related',
      title: 'Related Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
      group: 'editorial',
    }),
  ],
})
