import type { MetadataRoute } from "next";
import website from "./config/website";
import { getSitemapEntries } from "./sanity-api/sanity-queries";
import { _linkResolver } from "./lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await getSitemapEntries();

  return [
    {
      url: website.url,
      lastModified: new Date(),
    },
    {
      url: `${website.url}/biography`,
      lastModified: new Date(),
    },
    {
      url: `${website.url}/news`,
      lastModified: new Date(),
    },
    {
      url: `${website.url}/contact`,
      lastModified: new Date(),
    },
    ...items.map((item) => ({
      url: `${website.url}${_linkResolver(item)}`,
      lastModified: item._updatedAt,
    })),
  ];
}
