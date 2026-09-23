import { defineQuery } from "next-sanity";
import { sanityFetch } from "./sanity-client";
import {
  artworkCard,
  blockContent,
  figure,
  moduleArtworks,
  moduleEmbed,
  moduleExhibitions,
  moduleImages,
  modulePress,
  moduleProducts,
  moduleProjects,
  moduleSlider,
  moduleVideo,
  moduleVideos,
  projetCard,
  seo,
} from "./fragments";
import type {
  SETTINGS_QUERYResult,
  HOME_QUERYResult,
  PAGE_MODULAIRE_QUERYResult,
  PROJECT_QUERYResult,
  ARTWORK_QUERYResult,
  TAG_PROJECT_ARTWORK_QUERYResult,
  PRODUCT_QUERYResult,
  INFOS_QUERYResult,
  NEWS_QUERYResult,
  CONTACT_QUERYResult,
  SITEMAP_QUERYResult,
} from "../types/sanity.types";

/********************************************************************************************
 * SETTINGS
 */
export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]{
  ...,

  navPrimary[]{
    ...,
    _type == 'menuItem' => {
      ...,
      link{
        ...,
        link->{
          _type,
          slug
        }
      },
      subMenu[]{
        ...,
         link->{
          _type,
          slug
        }
      }
    }
  },
  navSecondary[]{
    ...,
    _type == 'linkExternal' => {
      ...
    },
    _type == 'linkInternal' => {
      ...,
      link->
    }
  },
  messageCookies{
    ${blockContent}
  }
}`);
export async function getSettings(): Promise<SETTINGS_QUERYResult> {
  return sanityFetch({
    query: SETTINGS_QUERY,
    tags: ["settings"],
  });
}

/********************************************************************************************
 * HOME
 */
export const HOME_QUERY = defineQuery(`*[_type == "home"][0]{
  ...,
  seo{
    ${seo}
   },
   link->{
    _type,
    slug
  },
   slider[]{
    ...,
    link->{
      _type,
      slug
    },
    images{
      ${figure}
    }
  },
  projects[]->{
    ${projetCard}
  }
}`);
export async function getHome(): Promise<HOME_QUERYResult> {
  return sanityFetch({
    query: HOME_QUERY,
    tags: ["home"],
  });
}

/********************************************************************************************
 * PAGE MODULAIRE
 */
export const PAGE_MODULAIRE_QUERY = defineQuery(`*[_type == "pageModulaire" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },

  modules[]{
    ...,
    ${moduleImages},
    ${moduleProducts},
    ${moduleProjects},
    ${moduleVideo},
    ${moduleVideos},
    ${moduleArtworks},
    ${modulePress},
    ${moduleExhibitions}
  },
}`);
export async function getPageModulaire(
  slug: string,
): Promise<PAGE_MODULAIRE_QUERYResult> {
  return sanityFetch({
    query: PAGE_MODULAIRE_QUERY,
    qParams: { slug },
    tags: ["pageModulaire", `pageModulaire:${slug}`],
  });
}

/********************************************************************************************
 * Project
 */
export const PROJECT_QUERY = defineQuery(`
*[_type == "project" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },

  imageCover{
    ${figure}
	},
  text{
    ${blockContent}
  },
  link{
    ...,
    link->{
      _type,
      slug
    }
  },
  tagProjectArtwork->{
    _type,
    slug
  },
  "artworks": *[
     _type == "artwork"
     && tagProjectArtwork._ref == ^.tagProjectArtwork._ref
    ]
    {
      slug
    },
  modules[]{
    ...,
    ${moduleImages},
    ${moduleProducts},
    ${moduleProjects},
    ${moduleSlider},
    ${moduleVideo}
  },

}
`);
export async function getProject(slug: string): Promise<PROJECT_QUERYResult> {
  return sanityFetch({
    query: PROJECT_QUERY,
    qParams: { slug },
    tags: ["project", `project:${slug}`],
  });
}

/********************************************************************************************
 * Artwork
 */
export const ARTWORK_QUERY = defineQuery(`
  *[_type == "artwork" && slug.current == $slug][0]{
    ...,
    seo{
      ${seo}
    },

    imageCover{
      ${figure}
    },
    images[]{
      ${figure}
    },
    text{
      ${blockContent}
    },
    tag->{title},
    link{
      ...,
      link->{
        _type,
        slug
      }
    },
  }
`);
export async function getArtwork(slug: string): Promise<ARTWORK_QUERYResult> {
  return sanityFetch({
    query: ARTWORK_QUERY,
    qParams: { slug },
    tags: ["artwork", `artwork:${slug}`],
  });
}

/********************************************************************************************
 * Tag Project Artwork
 */
export const TAG_PROJECT_ARTWORK_QUERY = defineQuery(`
  {
    'tag':*[_type == "tagProjectArtwork" && slug.current == $slug][0]{
      ...
    },

    'items':
      *[
      _type in ["artwork"] &&
      tagProjectArtwork->slug.current == $slug] {
        ${artworkCard}

    }
  }
`);
export async function getTagProjectArtworkQuery(
  slug: string,
): Promise<TAG_PROJECT_ARTWORK_QUERYResult> {
  return sanityFetch({
    query: TAG_PROJECT_ARTWORK_QUERY,
    qParams: { slug },
    tags: ["tagProjectArtwork", `tagProjectArtwork:${slug}`],
  });
}

/********************************************************************************************
 * Product
 */
export const PRODUCT_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]{
    ...,
    seo{
      ${seo}
    },

    imageCover{
      ${figure}
    },
    images[]{
      ${figure}
    },
    tag->{title}
  }
`);
export async function getProduct(slug: string): Promise<PRODUCT_QUERYResult> {
  return sanityFetch({
    query: PRODUCT_QUERY,
    qParams: { slug },
    tags: ["product", `product:${slug}`],
  });
}

/********************************************************************************************
 * INFOS
 */
export const INFOS_QUERY = defineQuery(`
  *[_type == "infos" ][0]{
    ...,
    seo{
      ${seo}
    },

    imageCover{
      ${figure}
    },
  }
`);
export async function getInfos(): Promise<INFOS_QUERYResult> {
  return sanityFetch({
    query: INFOS_QUERY,
    tags: ["infos"],
  });
}

/********************************************************************************************
 * NEWS
 */
export const NEWS_QUERY = defineQuery(`
  *[_type == "news" ][0]{
    ...,
    seo{
      ${seo}
    },

    items[]{
      ...,
      imageCover{
        ${figure}
      },
      images[]{
        ${figure}
      },

    },
  }
`);
export async function getNews(): Promise<NEWS_QUERYResult> {
  return sanityFetch({
    query: NEWS_QUERY,
    tags: ["news"],
  });
}

/********************************************************************************************
 * CONTACT
 */
export const CONTACT_QUERY = defineQuery(`
  *[_type == "contact" ][0]{
    ...,
    seo{
      ${seo}
    },


  }
`);
export async function getContact(): Promise<CONTACT_QUERYResult> {
  return sanityFetch({
    query: CONTACT_QUERY,
    tags: ["contact"],
  });
}

/********************************************************************************************
 * SITEMAP
 */
export const SITEMAP_QUERY = defineQuery(`
  *[_type in ["project", "product", "artwork", "tagProjectArtwork", "pageModulaire"] && defined(slug.current)]{
    _type,
    slug,
    _updatedAt
  }
`);
export async function getSitemapEntries(): Promise<SITEMAP_QUERYResult> {
  return sanityFetch({
    query: SITEMAP_QUERY,
    tags: ["sitemap"],
  });
}
