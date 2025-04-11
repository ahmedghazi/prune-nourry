import ContentContact from "@/app/components/ContentContact";
import website from "@/app/config/website";
import { Contact, Infos, News } from "@/app/types/schema";
import { getClient } from "@/app/utils/sanity-client";
import { getContact, newsQuery } from "@/app/utils/sanity-queries";
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
  const data = await getContact();
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
  let data: Contact;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      newsQuery,
      params
    );
  } else {
    data = await getContact();
  }

  if (!data) return <div>please edit page</div>;

  return (
    <div className='template template--contact' data-template='contact'>
      {data && <ContentContact input={data} />}
    </div>
  );
};

export default Page;
