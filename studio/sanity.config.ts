import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { media } from 'sanity-plugin-media'
import {presentationTool} from 'sanity/presentation'
import {structure} from './src/deskStructure'
import {resolveProductionUrl} from './src/actions/resolveProductionUrl'
// import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import { linkResolverPreview } from './src/linkResolverPreview'

// const devOnlyPlugins = [getStartedPlugin()]

const remoteURL = 'https://www.prunenourry.com'
const localURL = 'http://localhost:3000'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

const plugins = [
  structureTool({structure}),
  media({
    // creditLine: {
    //   enabled: true,
    //   // boolean - enables an optional "Credit Line" field in the plugin.
    //   // Used to store credits e.g. photographer, licence information
    //   // excludeSources: ['unsplash']
    //   // string | string[] - when used with 3rd party asset sources, you may
    //   // wish to prevent users overwriting the creditLine based on the `source.name`
    // },
    // locales: [
    //   {id: 'fr', title: 'French'},
    //   {id: 'en', title: 'English'},
    // ],
  }),
  visionTool(),
  // ...(isDev ? devOnlyPlugins : []),
  presentationTool({
    title: 'Live preview',
    resolve: linkResolverPreview,
    previewUrl: {
      origin: previewURL,
      previewMode: {
        enable: '/api/preview',
        disable: '/api/exit-preview',
      },
    },
  }),
]

export default defineConfig({
  name: 'default',
  title: 'Prune Noury Backoffice',

  projectId: 'ibjpcq8b',
  dataset: 'production',

  plugins: plugins,

  schema: {
    types: schemaTypes,
  },

  document: {
    // productionUrl: resolveProductionUrl,
    actions: [resolveProductionUrl],
  },
})
