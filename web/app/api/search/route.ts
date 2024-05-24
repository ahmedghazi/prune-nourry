// import { client } from "@/app/utils/sanity-client";
import { NextRequest, NextResponse } from "next/server";

import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-08-29",
  useCdn: true,
  withCredentials: true,
  token: process.env.SANITY_API_READ_TOKEN,
});

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "INVALID_METHOD" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json(); // res now contains body
  const { s } = body;

  const types = ["project", "product", "infos", "contact", "pageModulaire"];

  const query = `*[ _type in $types
    && !(_id in path("drafts.**"))
    && (
      title.en match $s + "*"
      || title.fr match $s + "*"
      || text.fr[].children[].text match $s + "*"
      || text.en[].children[].text match $s + "*"
      || excerpt.fr[].children[].text match $s + "*"
      || excerpt.en[].children[].text match $s + "*"
      )
    ]
    { _type, title, imageCover{...,asset->}, slug}`;

  // const params = { s: s };

  try {
    const res = await client.fetch(query, { s: s, types: types });
    console.log(query);
    console.log(res);
    return new NextResponse(JSON.stringify(res), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const error_response = {
      status: "error",
      message: error.message,
      raw: error,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
