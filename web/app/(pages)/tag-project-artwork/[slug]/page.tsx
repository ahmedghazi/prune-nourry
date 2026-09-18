import ContentTagProjectArtwork from "@/app/components/ContentTagProjectArtwork";
import { ITagProjectArtwork } from "@/app/types/extend";
import { getClient } from "@/app/sanity-api/sanity-client";
import {
  getTagProjectArtworkQuery,
  TAG_PROJECT_ARTWORK_QUERY,
} from "@/app/sanity-api/sanity-queries";
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
  const data = await getTagProjectArtworkQuery(params.slug);
  return {
    title: `${data?.tag?.title?.en || ""}`,
    description: "",
  };
}

const PageProduct: ({ params }: PageProps) => Promise<JSX.Element> = async (
  props,
) => {
  const params = await props.params;
  const { isEnabled: preview } = await draftMode();
  const data = preview
    ? await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
        TAG_PROJECT_ARTWORK_QUERY,
        params,
      )
    : await getTagProjectArtworkQuery(params.slug);

  if (!data?.tag) return notFound();

  return (
    <div
      className='template template--tag-project-artwork'
      data-template='tag-project-artwork'>
      <ContentTagProjectArtwork
        items={(data as unknown as ITagProjectArtwork).items}
      />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default PageProduct;
