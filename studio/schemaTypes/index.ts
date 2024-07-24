import home from './singletons/home'
import pageModulaire from './documents/pageModulaire'
import project from './documents/project'
import artwork from './documents/artwork'
import tag from './documents/tag'
import infos from './singletons/infos'
import news from './singletons/news'
import contact from './singletons/contact'
import settings from './singletons/settings'

import localeString from './locale/localeString'
import localeBlockContent from './locale/localeBlockContent'
import localeText from './locale/localeText'

import blockContent from './objects/blockContent'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import linkModal from './objects/linkModal'
import menuItem from './objects/menuItem'
import seo from './objects/seo'
import embed from './objects/embed'
import keyVal from './objects/keyVal'
import keyValGroup from './objects/keyValGroup'
import video from './objects/video'
import interTitre from './objects/interTitre'
import figure from './objects/figure'
// import artwork from './objects/artwork'
import newsArticle from './objects/newsArticle'
import exhibition from './objects/exhibition'
import slideProject from './objects/slideProject'

// import moduleImage from './objects/modules/imageUI'
import moduleImages from './objects/modules/imagesUI'
import moduleText from './objects/modules/textUI'
import moduleTexts from './objects/modules/textsUI'
import moduleEmbed from './objects/modules/embedUI'
import moduleProjects from './objects/modules/projectsUI'
// import moduleInterTitreUI from './objects/modules/interTitreUI'
import moduleVideo from './objects/modules/videoUI'
import moduleVideos from './objects/modules/videosUI'
import moduleSlider from './objects/modules/sliderUI'
import moduleProducts from './objects/modules/productsUI'
import moduleArtworks from './objects/modules/artworksUI'
import moduleExhibitions from './objects/modules/exhibitionsUI'
import modulePress from './objects/modules/pressUI'
// import moduleText from './objects/modules/textUI'

import product from './shop/product'
import productVariants from './shop/productVariants'
import productVariant from './shop/productVariant'
import newsInstagram from './objects/newsInstagram'

export const schemaTypes = [
  home,

  infos,
  settings,
  pageModulaire,
  project,
  artwork,
  tag,
  news,
  contact,
  // tagGroup,

  localeString,
  localeText,
  localeBlockContent,

  blockContent,
  linkExternal,
  linkInternal,
  linkModal,
  menuItem,
  seo,
  embed,
  keyVal,
  keyValGroup,
  video,
  interTitre,
  figure,
  // artwork,
  newsArticle,
  newsInstagram,
  exhibition,
  slideProject,

  // moduleImage,
  moduleImages,
  moduleText,
  moduleTexts,
  moduleEmbed,
  moduleProjects,
  // moduleInterTitreUI,
  moduleVideo,
  moduleVideos,
  moduleSlider,
  moduleProducts,
  moduleArtworks,
  moduleExhibitions,
  modulePress,
  // moduleText,

  product,
  productVariants,
  productVariant,
]
export default schemaTypes
