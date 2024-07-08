import React from "react";
import locales from "../config/i18n";
import UseLocaleContext from "../context/LocaleContext";
import {
  Artwork,
  Home,
  Infos,
  PageModulaire,
  Project,
  Tag,
} from "../types/schema";

export const _linkResolver = (
  node: Infos | PageModulaire | Home | Project | Artwork | Tag | any
) => {
  // console.log(node);
  if (!node || !node._type || node._type === "home") return "/";
  console.log(node._type);
  switch (node._type) {
    case "project":
      return `/project/${node.slug?.current}`;
    case "product":
      return `/product/${node.slug?.current}`;
    case "artwork":
      return `/artwork/${node.slug?.current}`;

    default:
      return `/${node.slug?.current}`;
  }
};

export const _localizeText = (text: string) => {
  // const locale = "fr"
  const { locale } = UseLocaleContext();
  const currentI18N = (locales as any)[`${locale}`];
  return currentI18N[text] ? currentI18N[text] : text;
};

export const _localizeField = (field: any) => {
  const { locale } = UseLocaleContext();
  // console.log(locale, field);
  if (!field) return "";
  return field && field[locale] ? field[locale] : field["en"];
};

export const _preloadImages = (urls: Array<string | any>) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

export const _revealEmail = (input: string) => {
  return input.replace("(at)", "@");
};

export const _slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

export const _date = (d: string | any) => {
  const { locale } = UseLocaleContext();
  const dateLocale = locale === "fr" ? "fr-fr" : "en-us";

  const date: Date = new Date(d);
  return date.toLocaleDateString(dateLocale, {
    // weekday: "narrow",
    year: "numeric",
    // month: "2-digit",
    month: "long",
    day: "2-digit",
    // hour: "numeric",
  });
};
