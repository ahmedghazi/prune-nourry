import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ibjpcq8b',
    dataset: 'production'
  },
  schemaExtraction: {
    enabled: true
  },
  studioHost: 'backoffice--prune-noury',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    // appId: 'fmsaa225eau27p1nwe6l6xxu',
  },
  typegen: {
    path: '../web/app/sanity-api/*.{ts,tsx}',
    generates: '../web/app/sanity-api/types/sanity.types.ts',
    overloadClientMethods: true,
  },
})
