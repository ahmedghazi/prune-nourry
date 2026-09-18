import ContentNews from "@/app/components/ContentNews";
import website from "@/app/config/website";
import { News } from "@/app/types/schema";
import { getClient } from "@/app/sanity-api/sanity-client";
import { getNews, NEWS_QUERY } from "@/app/sanity-api/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import React, { JSX } from "react";

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const data = await getNews();
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
        NEWS_QUERY,
      )
    : await getNews();

  if (!data) return notFound();

  return (
    <div className='template template--news' data-template='news'>
      <div className=''>
        <ContentNews input={data as unknown as News} />
      </div>
    </div>
  );
};

export default Page;
