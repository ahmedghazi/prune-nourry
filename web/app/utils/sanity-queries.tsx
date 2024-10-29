import { groq } from "next-sanity";
import { client } from "./sanity-client";
import {
  Artwork,
  Contact,
  Home,
  Infos,
  News,
  PageModulaire,
  Product,
  Project,
  Settings,
} from "../types/schema";
import {
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
import { cache } from "react";
import { ProductExtend } from "../types/extend";

export const cachedClient = cache(client.fetch.bind(client));

/********************************************************************************************
 * SETTINGS
 */
export async function getSettings(): Promise<Settings> {
  return client.fetch(
    groq`*[_type == "settings"][0]{
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

    }`
  );
}

/********************************************************************************************
 * HOME
 */

export const homeQuery = groq`*[_type == "home"][0]{
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
}`;
export async function getHome(): Promise<Home> {
  return cachedClient(homeQuery, {});
}

/********************************************************************************************
 * PAGE MODULAIRE
 */
export const pageModulaireQuery = groq`*[_type == "pageModulaire" && slug.current == $slug][0]{
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
}`;
export async function getPageModulaire(slug: string): Promise<PageModulaire> {
  return cachedClient(pageModulaireQuery, { slug: slug });
}

/********************************************************************************************
 * Project
 */
export const projectQuery = groq`
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
  modules[]{
    ...,
    ${moduleImages},
    ${moduleProducts},
    ${moduleProjects},
    ${moduleSlider},
    ${moduleVideo}
  },

}
`;
export async function getProject(slug: string): Promise<Project> {
  return cachedClient(projectQuery, { slug: slug });
}

/********************************************************************************************
 * Product
 */
export const artworkQuery = groq`
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
`;
export async function getArtwork(slug: string): Promise<Artwork> {
  return cachedClient(artworkQuery, { slug: slug });
}

/********************************************************************************************
 * Product
 */
export const productQuery = groq`
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
`;
export async function getProduct(slug: string): Promise<ProductExtend> {
  return cachedClient(productQuery, { slug: slug });
}

/********************************************************************************************
 * INFOS
 */
export const infosQuery = groq`
  *[_type == "infos" ][0]{
    ...,
    seo{
      ${seo}
    },

    imageCover{
      ${figure}
    },
  }
`;
export async function getInfos(): Promise<Infos> {
  return cachedClient(infosQuery, {});
}

/********************************************************************************************
 * NEWS
 */
export const newsQuery = groq`
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
`;
export async function getNews(): Promise<News> {
  return cachedClient(newsQuery, {});
}

/********************************************************************************************
 * CONTACT
 */
export const contactQuery = groq`
  *[_type == "contact" ][0]{
    ...,
    seo{
      ${seo}
    },


  }
`;
export async function getContact(): Promise<Contact> {
  return cachedClient(contactQuery, {});
}
