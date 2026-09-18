import ContentArtwork from "@/app/components/ContentArtwork";
import website from "@/app/config/website";
import { Artwork } from "@/app/types/schema";
import { getClient } from "@/app/sanity-api/sanity-client";
import { getArtwork, ARTWORK_QUERY } from "@/app/sanity-api/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import React, { JSX } from "react";

export const revalidate = 3600; // revalidate every hour

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const data = await getArtwork(params.slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription || "",
    openGraph: {
      images: data?.seo?.metaImage?.asset?.url || website.image,
    },
  };
}

const PageProduct: ({ params }: PageProps) => Promise<JSX.Element> = async (
  props,
) => {
  const params = await props.params;
  const { isEnabled: preview } = await draftMode();
  const data = preview
    ? await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
        ARTWORK_QUERY,
        params,
      )
    : await getArtwork(params.slug);

  if (!data) return notFound();

  return (
    <div className='template template--artwork' data-template='artwork'>
      <ContentArtwork input={data as unknown as Artwork} />
    </div>
  );
};

export default PageProduct;
