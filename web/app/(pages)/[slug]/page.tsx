import ContentPageModulaire from "@/app/components/ContentPageModulaire";
import website from "@/app/config/website";
import { PageModulaire } from "@/app/types/schema";
import { getClient } from "@/app/utils/sanity-client";
import {
  getPageModulaire,
  pageModulaireQuery,
} from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React, { JSX } from "react";
import { notFound } from "next/navigation";

export const revalidate = 0; // revalidate every hour
// export const dynamic = "force-dynamic";

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
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const Page: ({ params }: PageProps) => Promise<JSX.Element> = async (props) => {
  const params = await props.params;
  const { isEnabled: preview } = await draftMode();
  let data: PageModulaire;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      pageModulaireQuery,
      params
    );
  } else {
    data = (await getPageModulaire(params.slug)) as PageModulaire;
  }

  if (!data) return notFound();
  return (
    <div
      className='template template--page-modulaire'
      data-template='page-modulaire'>
      {data.title && data.modules && (
        <ContentPageModulaire title={data.title} input={data.modules} />
      )}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Page;
