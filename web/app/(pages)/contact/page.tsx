import ContentContact from "@/app/components/ContentContact";
import website from "@/app/config/website";
import { Contact } from "@/app/types/schema";
import { getClient } from "@/app/utils/sanity-client";
import { getContact, CONTACT_QUERY } from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import React, { JSX } from "react";

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContact();
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
        CONTACT_QUERY,
      )
    : await getContact();

  if (!data) return notFound();

  return (
    <div className='template template--contact' data-template='contact'>
      <ContentContact input={data as unknown as Contact} />
    </div>
  );
};

export default Page;
