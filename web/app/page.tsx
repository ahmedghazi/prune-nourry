import { draftMode } from "next/headers";

import { Metadata } from "next";
import website from "./config/website";

import { getClient } from "./sanity-api/sanity-client";
import { getHome, HOME_QUERY } from "./sanity-api/sanity-queries";
import ContentHome from "./components/ContentHome";
import { Home } from "./types/schema";
import { notFound } from "next/navigation";
import { JSX } from "react";

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHome();
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset?.url || website.image,
    },
  };
}

const Page = async function Page(): Promise<JSX.Element> {
  const { isEnabled: preview } = await draftMode();
  const data = preview
    ? await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
        HOME_QUERY,
      )
    : await getHome();

  if (!data) return notFound();

  return (
    <div className='template template--home' data-template='home'>
      <ContentHome input={data as unknown as Home} />
    </div>
  );
};

export default Page;
