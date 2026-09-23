import ContentInfos from "@/app/components/ContentInfos";
import website from "@/app/config/website";
import { Infos } from "@/app/types/schema";
import { getClient } from "@/app/sanity-api/sanity-client";
import { getInfos, INFOS_QUERY } from "@/app/sanity-api/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import React, { JSX } from "react";

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const data = await getInfos();
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
        INFOS_QUERY,
      )
    : await getInfos();

  if (!data) return notFound();

  return (
    <div className='template template--infos' data-template='infos'>
      <div className=''>
        <ContentInfos input={data as unknown as Infos} />
      </div>
    </div>
  );
};

export default Page;
