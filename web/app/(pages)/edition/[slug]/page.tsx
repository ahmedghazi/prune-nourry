import ContentProduct from "@/app/components/ContentProduct";
import website from "@/app/config/website";
import { ProductExtend } from "@/app/types/extend";
import { getClient } from "@/app/utils/sanity-client";
import { getProduct, productQuery } from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React, { JSX } from "react";

// export const revalidate = 3600; // revalidate every hour
export const dynamic = "force-dynamic";

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
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const PageProduct: ({ params }: PageProps) => Promise<JSX.Element> = async (
  props
) => {
  const params = await props.params;
  const { isEnabled: preview } = await draftMode();
  let data: ProductExtend;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      productQuery,
      params
    );
  } else {
    data = await getProduct(params.slug);
  }
  // console.log(productQuery);
  if (!data) return <div>please edit page</div>;
  // data.quantity = 1;
  return (
    <div className='template template--product' data-template='product'>
      <ContentProduct input={data} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default PageProduct;
