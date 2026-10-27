import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type: string;
  slug?: string;
};

/**
 * Called by a Sanity GROQ webhook on create/update/delete.
 * Webhook projection: {_type, "slug": slug.current}
 * Revalidates the tags set in sanity-queries.tsx: `${_type}` and `${_type}:${slug}`.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true,
    );
    console.log({ isValidSignature });
    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new Response("Bad request", { status: 400 });
    }

    const tags = [body._type, "sitemap"];
    if (body.slug) tags.push(`${body._type}:${body.slug}`);

    tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));

    return NextResponse.json({ revalidated: tags, now: Date.now() });
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message, { status: 500 });
  }
}
