import ContentNews from "@/app/components/ContentNews";
import website from "@/app/config/website";
import { News } from "@/app/types/schema";
import { getClient } from "@/app/utils/sanity-client";
import { getNews, newsQuery } from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React, { JSX } from "react";

// export const revalidate = 3600; // revalidate every hour
export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getNews();
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}
const Page: ({ params }: PageProps) => Promise<JSX.Element> = async (props) => {
  const params = await props.params;
  const { isEnabled: preview } = await draftMode();
  let data: News;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      newsQuery,
      params
    );
  } else {
    data = await getNews();
  }

  if (!data) return <div>please edit page</div>;

  return (
    <div className='template template--news' data-template='news'>
      <div className=''>{data && <ContentNews input={data} />}</div>
    </div>
  );
};

export default Page;
