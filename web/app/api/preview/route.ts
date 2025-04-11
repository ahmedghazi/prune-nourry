import { _linkResolver } from "@/app/utils/utils";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  // const target = type === "project" ? `/project/${slug}` : `/${slug}`
  let target = "";
  switch (type) {
    case "home":
      target = `/`;
      break;
    case "project":
      target = `/project/${slug}`;
      break;
    case "product":
      target = `/product/${slug}`;
      break;
    case "artwork":
      target = `/artwork/${slug}`;
      break;

    default:
      target = `/${slug}`;
      break;
  }
  // console.log(request.url)
  // console.log(type, slug, target)

  (await draftMode()).enable();
  redirect(target);
}
