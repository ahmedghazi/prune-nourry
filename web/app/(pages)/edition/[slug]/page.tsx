import ContentProduct from "@/app/components/ContentProduct";
import website from "@/app/config/website";
import { ProductExtend } from "@/app/types/extend";
import { getClient } from "@/app/utils/sanity-client";
import { getProduct, PRODUCT_QUERY } from "@/app/utils/sanity-queries";
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
  const data = await getProduct(params.slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription || "",
    openGraph: {
      images: data?.seo?.metaImage?.asset?.url || website.image,
    },
  };
}

const PageProduct: ({ params }: PageProps) => Promise<JSX.Element> = async (
  props
) => {
  const params = await props.params;
  const { isEnabled: preview } = await draftMode();
  const data = preview
    ? await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
        PRODUCT_QUERY,
        params,
      )
    : await getProduct(params.slug);

  if (!data) return notFound();

  return (
    <div className='template template--product' data-template='product'>
      <ContentProduct input={data as unknown as ProductExtend} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default PageProduct;
