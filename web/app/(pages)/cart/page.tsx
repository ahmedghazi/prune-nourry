import Cart from "@/app/components/shop/Cart";
import { Metadata } from "next";
import React from "react";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: "Cart",
    // description: data?.seo?.metaDescription,
    // openGraph: {
    //   images: data?.seo?.metaImage?.asset.url || website.image,
    // },
  };
}

const Page = ({ params }: PageProps) => {
  return (
    <div className='template template--cart' data-template='cart'>
      <Suspense fallback={<div>Loading...</div>}>
        <Cart />
      </Suspense>
    </div>
  );
};

export default Page;
