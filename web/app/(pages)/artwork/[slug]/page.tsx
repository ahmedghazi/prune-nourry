import ContentArtwork from "@/app/components/ContentArtwork";
import ContentProduct from "@/app/components/ContentProduct";
import website from "@/app/config/website";
import { ProductExtend } from "@/app/types/extend";
import { Artwork } from "@/app/types/schema";
import { getClient } from "@/app/utils/sanity-client";
import {
  artworkQuery,
  getArtwork,
  getProduct,
  productQuery,
} from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React from "react";

export const revalidate = 300; // revalidate every hour
export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getArtwork(params.slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription || "",
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const PageProduct: ({ params }: PageProps) => Promise<JSX.Element> = async ({
  params,
}) => {
  const { isEnabled: preview } = draftMode();
  let data: Artwork;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      artworkQuery,
      params
    );
  } else {
    data = await getArtwork(params.slug);
  }
  // console.log(productQuery);
  if (!data) return <div>please edit page {params.slug} or refresh</div>;

  return (
    <div className='template template--artwork' data-template='artwork'>
      <ContentArtwork input={data} />
    </div>
  );
};

export default PageProduct;
