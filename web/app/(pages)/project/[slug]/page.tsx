import ContentProject from "@/app/components/ContentProject";
import website from "@/app/config/website";
import { ProjectExtend } from "@/app/types/extend";
import { Project } from "@/app/types/schema";
import { getClient } from "@/app/utils/sanity-client";
import { getProject, projectQuery } from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React, { JSX } from "react";

export const revalidate = 0; // revalidate every hour

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
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const Page: ({ params }: PageProps) => Promise<JSX.Element> = async (props) => {
  const params = await props.params;
  const { isEnabled: preview } = await draftMode();
  let data: ProjectExtend;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      projectQuery,
      params
    );
  } else {
    data = (await getProject(params.slug)) as ProjectExtend;
  }
  if (!data) return <div>please edit page</div>;

  return (
    <div className='template template--project' data-template='project'>
      <ContentProject input={data} />
      {/* <pre>{JSON.stringify(data.excerpt, null, 2)}</pre> */}
    </div>
  );
};

export default Page;
