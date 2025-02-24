import ContentNews from "@/app/components/ContentNews";
import website from "@/app/config/website";
import { News } from "@/app/types/schema";
import { getClient } from "@/app/utils/sanity-client";
import { getNews, newsQuery } from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React from "react";

// export const revalidate = 3600; // revalidate every hour
export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    slug: string;
  };
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
const Page: ({ params }: PageProps) => Promise<JSX.Element> = async ({
  params,
}) => {
  const { isEnabled: preview } = draftMode();
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
