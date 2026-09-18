import ContentProject from "@/app/components/ContentProject";
import website from "@/app/config/website";
import { ProjectExtend } from "@/app/types/extend";
import { getClient } from "@/app/utils/sanity-client";
import { getProject, PROJECT_QUERY } from "@/app/utils/sanity-queries";
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
  const data = await getProject(params.slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title?.en || ""}`,
    description: data?.seo?.metaDescription || "",
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
        PROJECT_QUERY,
        params,
      )
    : await getProject(params.slug);

  if (!data) return notFound();

  return (
    <div className='template template--project' data-template='project'>
      <ContentProject input={data as unknown as ProjectExtend} />
      {/* <pre>{JSON.stringify(data.excerpt, null, 2)}</pre> */}
    </div>
  );
};

export default Page;
