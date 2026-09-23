import ContentPageModulaire from "@/app/components/ContentPageModulaire";
import website from "@/app/config/website";
import { PageModulaire } from "@/app/types/schema";
import { getClient } from "@/app/sanity-api/sanity-client";
import {
  getPageModulaire,
  PAGE_MODULAIRE_QUERY,
} from "@/app/sanity-api/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React, { JSX } from "react";
import { notFound } from "next/navigation";

export const revalidate = 3600; // revalidate every hour

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const data = await getPageModulaire(params.slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset?.url || website.image,
    },
  };
}

const Page: ({ params }: PageProps) => Promise<JSX.Element> = async (props) => {
  const params = await props.params;
  const { isEnabled: preview } = await draftMode();
  const data = preview
    ? await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
        PAGE_MODULAIRE_QUERY,
        params,
      )
    : await getPageModulaire(params.slug);

  if (!data) return notFound();

  const page = data as unknown as PageModulaire;
  return (
    <div
      className='template template--page-modulaire'
      data-template='page-modulaire'>
      {page.title && page.modules && (
        <ContentPageModulaire title={page.title} input={page.modules} />
      )}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Page;
