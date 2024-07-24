import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Home
 *
 *
 */
export interface Home extends SanityDocument {
  _type: "home";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Titre — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL basée sur le titre (sans espace ni caractère autre que a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Link on click on the slider — `reference`
   *
   *
   */
  link?: SanityReference<PageModulaire | Project | Home | Infos | News>;

  /**
   * Slider — `array`
   *
   *
   */
  slider?: Array<SanityKeyed<SlideProject>>;

  /**
   * projects — `array`
   *
   *
   */
  projects?: Array<SanityKeyedReference<Project>>;
}

/**
 * Infos
 *
 *
 */
export interface Infos extends SanityDocument {
  _type: "infos";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL based on the title (no space, or char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Texte — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;

  /**
   * Image clef — `image`
   *
   *
   */
  imageCover?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * List — `array`
   *
   * Exhibitions
   */
  list?: Array<SanityKeyed<KeyValGroup>>;
}

/**
 * Réglages (header, footer, ...)
 *
 *
 */
export interface Settings extends SanityDocument {
  _type: "settings";

  /**
   * Nom du site — `string`
   *
   *
   */
  siteName?: string;

  /**
   * Naviguation Primary — `array`
   *
   *
   */
  navPrimary?: Array<SanityKeyed<MenuItem> | SanityKeyed<LinkExternal>>;

  /**
   * Naviguation Secondary — `array`
   *
   *
   */
  navSecondary?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;

  /**
   * URL Newsletter — `string`
   *
   *
   */
  urlNewsletter?: string;

  /**
   * Instagram — `linkExternal`
   *
   *
   */
  instagram?: LinkExternal;

  /**
   * Message 404 — `blockContent`
   *
   *
   */
  message404?: BlockContent;

  /**
   * customCss — `text`
   *
   *
   */
  customCss?: string;
}

/**
 * Page Modulaire
 *
 *
 */
export interface PageModulaire extends SanityDocument {
  _type: "pageModulaire";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Titre — `localeString`
   *
   * Le nom de la page
   */
  title?: LocaleString;

  /**
   * Soustitre — `localeString`
   *
   * optionnel en fonction du model de page
   */
  subTitle?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL basée sur le titre (sans espace ni caractère autre que a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Modules — `array`
   *
   * Zone de contenu Modulaire (images, textes, embed)
   */
  modules?: Array<
    | SanityKeyed<ModuleImages>
    | SanityKeyed<ModuleArtworks>
    | SanityKeyed<ModulePress>
    | SanityKeyed<ModuleVideo>
    | SanityKeyed<ModuleVideos>
    | SanityKeyed<ModuleSlider>
    | SanityKeyed<ModuleProjects>
    | SanityKeyed<ModuleProducts>
    | SanityKeyed<ModuleExhibitions>
  >;
}

/**
 * Project
 *
 *
 */
export interface Project extends SanityDocument {
  _type: "project";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Titre — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL basée sur le titre (sans espace ni caractère autre que a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Soustitre — `string`
   *
   *
   */
  subTitle?: string;

  /**
   * Année — `string`
   *
   *
   */
  year?: string;

  /**
   * Image clef — `image`
   *
   * Visible on liste pages, project cards (largeur 1400px)
   */
  imageCover?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Texte Extrait — `localeBlockContent`
   *
   *
   */
  excerpt?: LocaleBlockContent;

  /**
   * Texte — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;

  /**
   * Crédits — `localeBlockContent`
   *
   *
   */
  credits?: LocaleBlockContent;

  /**
   * link — `linkInternal`
   *
   *
   */
  link?: LinkInternal;

  /**
   * Modules — `array`
   *
   * Zone de contenu Modulaire (images, textes, embed)
   */
  modules?: Array<
    | SanityKeyed<ModuleImages>
    | SanityKeyed<ModuleArtworks>
    | SanityKeyed<ModulePress>
    | SanityKeyed<ModuleVideo>
    | SanityKeyed<ModuleVideos>
    | SanityKeyed<ModuleSlider>
    | SanityKeyed<ModuleProjects>
    | SanityKeyed<ModuleProducts>
    | SanityKeyed<ModuleExhibitions>
  >;
}

/**
 * Artwork
 *
 *
 */
export interface Artwork extends SanityDocument {
  _type: "artwork";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Titre — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL basée sur le titre (sans espace ni caractère autre que a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Descrition — `string`
   *
   *
   */
  description?: string;

  /**
   * Image clef — `image`
   *
   * Visible on liste pages, project cards (largeur 1400px)
   */
  imageCover?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Images — `array`
   *
   *
   */
  images?: Array<SanityKeyed<Figure>>;

  /**
   * Texte — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;

  /**
   * link — `linkInternal`
   *
   * Internal
   */
  link?: LinkInternal;
}

/**
 * Tag
 *
 *
 */
export interface Tag extends SanityDocument {
  _type: "tag";

  /**
   * Title — `localeString`
   *
   *
   */
  title?: LocaleString;
}

/**
 * News
 *
 *
 */
export interface News extends SanityDocument {
  _type: "news";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL based on the title (no space, or char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Instagram posts — `array`
   *
   *
   */
  items?: Array<SanityKeyed<NewsInstagram>>;
}

/**
 * Contact
 *
 *
 */
export interface Contact extends SanityDocument {
  _type: "contact";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL based on the title (no space, or char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Texte — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;

  /**
   * Crédits — `localeBlockContent`
   *
   *
   */
  credits?: LocaleBlockContent;
}

/**
 * Product
 *
 *
 */
export interface Product extends SanityDocument {
  _type: "product";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL based on the title (no space, or char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Tag — `reference`
   *
   *
   */
  tag?: SanityReference<Tag>;

  /**
   * Image clef — `image`
   *
   * Visible on liste pages, project cards (largeur 1400px)
   */
  imageCover?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Images — `array`
   *
   *
   */
  images?: Array<SanityKeyed<Figure>>;

  /**
   * External link — `linkExternal`
   *
   * si renseigné remplace le add to cart stripe local et ouvre un nouvel onglet vers cette url
   */
  externalProductLink?: LinkExternal;

  /**
   * Prix — `number`
   *
   * Prix par défaut si pas de variants
   */
  price?: number;

  /**
   * Prix barré — `number`
   *
   *
   */
  priceCrossed?: number;

  /**
   * Quantity — `number`
   *
   *
   */
  quantity?: number;

  /**
   * Weight — `number`
   *
   * Weight in grams
   */
  weight?: number;

  /**
   * Tax name — `string`
   *
   * from snipcart > taxes
   */
  tax?: string;

  /**
   * SKU — `string`
   *
   * default sku if no variants
   */
  sku?: string;

  /**
   * Blurb — `localeText`
   *
   * description courte pour le shop (Black vinyl - shiny cover - black innersleeve)
   */
  blurb?: LocaleText;

  /**
   * Text — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;

  /**
   * Related Products — `array`
   *
   *
   */
  related?: Array<SanityKeyedReference<Product>>;
}

export type LocaleString = {
  _type: "localeString";
  /**
   * English — `string`
   *
   *
   */
  en?: string;

  /**
   * Français — `string`
   *
   *
   */
  fr?: string;
};

export type LocaleText = {
  _type: "localeText";
  /**
   * English — `text`
   *
   *
   */
  en?: string;

  /**
   * Français — `text`
   *
   *
   */
  fr?: string;
};

export type LocaleBlockContent = {
  _type: "localeBlockContent";
  /**
   * English — `blockContent`
   *
   *
   */
  en?: BlockContent;

  /**
   * Français — `blockContent`
   *
   *
   */
  fr?: BlockContent;
};

export type BlockContent = Array<SanityKeyed<SanityBlock>>;

export type LinkExternal = {
  _type: "linkExternal";
  /**
   * Label — `string`
   *
   *
   */
  label?: string;

  /**
   * Link — `string`
   *
   *
   */
  link?: string;
};

export type LinkInternal = {
  _type: "linkInternal";
  /**
   * label — `localeString`
   *
   *
   */
  label?: LocaleString;

  /**
   * link — `reference`
   *
   *
   */
  link?: SanityReference<
    PageModulaire | Project | Home | Infos | News | Contact
  >;
};

export type LinkModal = {
  _type: "linkModal";
  /**
   * label — `localeString`
   *
   *
   */
  label?: LocaleString;

  /**
   * target — `string`
   *
   *
   */
  target?: "modal-works";
};

export type MenuItem = {
  _type: "menuItem";
  /**
   * link — `linkInternal`
   *
   *
   */
  link?: LinkInternal;

  /**
   * Sub menu — `array`
   *
   *
   */
  subMenu?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;
};

export type Seo = {
  _type: "seo";
  /**
   * Meta title — `string`
   *
   *
   */
  metaTitle?: string;

  /**
   * Meta description — `string`
   *
   *
   */
  metaDescription?: string;

  /**
   * Meta image — `image`
   *
   *
   */
  metaImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type Embed = {
  _type: "embed";
  /**
   * title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * subTitle — `localeString`
   *
   *
   */
  subTitle?: LocaleString;

  /**
   * placeholder — `image`
   *
   *
   */
  placeholder?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * url — `url`
   *
   * url publique du media ex: https://www.youtube.com/watch?v=exTZ9vB6ZeE
   */
  url?: string;

  /**
   * aspectRatio — `string`
   *
   * Ratio de la video. Examples de format: 5 / 3 ou 16 / 9 ou 4 / 3
   */
  aspectRatio?: string;
};

export type KeyVal = {
  _type: "keyVal";
  /**
   * Clef — `string`
   *
   *
   */
  key?: string;

  /**
   * Valeur — `localeBlockContent`
   *
   *
   */
  val?: LocaleBlockContent;
};

export type KeyValGroup = {
  _type: "keyValGroup";
  /**
   * title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<KeyVal>>;
};

export type Video = {
  _type: "video";
  /**
   * url — `url`
   *
   *
   */
  url?: string;

  /**
   * placeholder — `image`
   *
   *
   */
  placeholder?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type InterTitre = {
  _type: "interTitre";
  /**
   * Index — `number`
   *
   *
   */
  index?: number;

  /**
   * Titre — `localeString`
   *
   *
   */
  title?: LocaleString;
};

export type Figure = {
  _type: "figure";
  /**
   * Image — `image`
   *
   * jpg, 1400px de large, 72dpi
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;

  /**
   * Link — `reference`
   *
   * optional
   */
  link?: SanityReference<
    PageModulaire | Project | Home | Infos | News | Contact
  >;
};

export type NewsArticle = {
  _type: "newsArticle";
  /**
   * date — `string`
   *
   *
   */
  date?: string;

  /**
   * mediaTitle — `string`
   *
   *
   */
  mediaTitle?: string;

  /**
   * title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Image — `figure`
   *
   *
   */
  image?: Figure;

  /**
   * link — `linkExternal`
   *
   *
   */
  link?: LinkExternal;
};

export type NewsInstagram = {
  _type: "newsInstagram";
  /**
   * Image clef — `image`
   *
   * Visible on liste pages, project cards (largeur 1400px)
   */
  imageCover?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Texte Extrait — `localeBlockContent`
   *
   *
   */
  excerpt?: LocaleBlockContent;

  /**
   * text — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;

  /**
   * images — `array`
   *
   *
   */
  images?: Array<SanityKeyed<Figure>>;
};

export type Exhibition = {
  _type: "exhibition";
  /**
   * title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * text — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;

  /**
   * slider — `array`
   *
   *
   */
  slider?: Array<SanityKeyed<Figure>>;
};

export type SlideProject = {
  _type: "slideProject";
  /**
   * image — `figure`
   *
   *
   */
  image?: Figure;

  /**
   * link — `reference`
   *
   *
   */
  link?: SanityReference<Project>;
};

export type ModuleImages = {
  _type: "moduleImages";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<Figure>>;

  /**
   * gridSize — `number`
   *
   * Number of columns
   */
  gridSize?: number;

  /**
   * gridType — `string`
   *
   *
   */
  gridType?: "default" | "masonry";
};

export type ModuleText = {
  _type: "moduleText";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * Text — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;

  /**
   * width — `number`
   *
   * Size in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com
   */
  width?: number;

  /**
   * Offset — `number`
   *
   * Indent in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com
   */
  offset?: number;

  /**
   * columns — `number`
   *
   * 1 columns text, 2, default 1
   */
  columns?: number;
};

export type ModuleTexts = {
  _type: "moduleTexts";
  /**
   * title — `string`
   *
   * Module titre (visible uniquement dans l'admin)
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<LocaleBlockContent>>;
};

export type ModuleEmbed = {
  _type: "moduleEmbed";
  /**
   * Title — `string`
   *
   * Title
   */
  title?: string;

  /**
   * embed — `embed`
   *
   *
   */
  embed?: Embed;
};

export type ModuleProjects = {
  _type: "moduleProjects";
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyedReference<Project>>;
};

export type ModuleVideo = {
  _type: "moduleVideo";
  /**
   * Title — `string`
   *
   * Title
   */
  title?: string;

  /**
   * Video — `embed`
   *
   *
   */
  embed?: Embed;
};

export type ModuleVideos = {
  _type: "moduleVideos";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<Embed>>;

  /**
   * gridSize — `number`
   *
   * Number of columns
   */
  gridSize?: number;
};

export type ModuleSlider = {
  _type: "moduleSlider";
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * images — `array`
   *
   *
   */
  images?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;
};

export type ModuleProducts = {
  _type: "moduleProducts";
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyedReference<Product>>;
};

export type ModuleArtworks = {
  _type: "moduleArtworks";
  /**
   * title — `string`
   *
   * Module title
   */
  title?: string;

  /**
   * gridSize — `number`
   *
   * Number of columns
   */
  gridSize?: number;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyedReference<Artwork>>;
};

export type ModuleExhibitions = {
  _type: "moduleExhibitions";
  /**
   * title — `string`
   *
   * Module title
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<Exhibition>>;
};

export type ModulePress = {
  _type: "modulePress";
  /**
   * title — `string`
   *
   * Module title
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<NewsArticle>>;
};

export type ProductVariants = {
  _type: "productVariants";
  /**
   * Title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Variant — `array`
   *
   *
   */
  items?: Array<SanityKeyed<ProductVariant>>;
};

export type ProductVariant = {
  _type: "productVariant";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Quantity — `number`
   *
   *
   */
  qty?: number;

  /**
   * SKU — `string`
   *
   *
   */
  sku?: string;

  /**
   * image — `figure`
   *
   *
   */
  image?: Figure;
};

export type Documents =
  | Home
  | Infos
  | Settings
  | PageModulaire
  | Project
  | Artwork
  | Tag
  | News
  | Contact
  | Product;
