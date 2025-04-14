import CardArtwork from "@/app/components/CardArtwork";
import ContentTagProjectArtwork from "@/app/components/ContentTagProjectArtwork";
import { ITagProjectArtwork } from "@/app/types/extend";
import { getClient } from "@/app/utils/sanity-client";
import {
  artworkQuery,
  getTagProjectArtworkQuery,
} from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React, { JSX } from "react";
import Masonry from "react-masonry-css";

// export const revalidate = 300; // revalidate every hour
// export const dynamic = "force-dynamic";
export const revalidate = 0; // revalidate every hour

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const data = await getTagProjectArtworkQuery(params.slug);
  return {
    title: `${data.tag?.title?.en || ""}`,
    description: "",
    // openGraph: {
    //   images: data?.seo?.metaImage?.asset.url || website.image,
    // },
  };
}

const PageProduct: ({ params }: PageProps) => Promise<JSX.Element> = async (
  props
) => {
  const params = await props.params;
  const { isEnabled: preview } = await draftMode();
  let data: ITagProjectArtwork;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      artworkQuery,
      params
    );
  } else {
    data = await getTagProjectArtworkQuery(params.slug);
  }
  // console.log(productQuery);
  if (!data) return <div>please edit page {params.slug} or refresh</div>;

  return (
    <div
      className='template template--tag-project-artwork'
      data-template='tag-project-artwork'>
      <ContentTagProjectArtwork items={data.items} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <ContentArtwork input={data} /> */}
    </div>
  );
};

export default PageProduct;
