import {
  createClient,
  SanityClient,
  type ClientConfig,
  type QueryParams,
} from "@sanity/client";
import { projectId, dataset, apiVersion, token, studioUrl } from "./sanity.api";

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token,
  // With a token and apiVersion < 2025-02-19 the API defaults to the "raw"
  // perspective, which returns drafts alongside published docs.
  perspective: "published",
};

export const sanityConfig = {
  projectId: projectId,
  dataset: dataset,
};

export const client = createClient(config);

export function getClient(preview?: { token?: string }): SanityClient {
  if (preview) {
    if (!preview.token) {
      throw new Error("You must provide a token to preview drafts");
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "drafts",
      stega: {
        enabled: true,
        studioUrl: studioUrl,
      },
    });
  }
  return client;
}

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    // Next caches the result and the webhook revalidates it, so skip the
    // Sanity CDN to avoid re-caching stale data right after a publish.
    useCdn: false,
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    next: { tags },
  });
}
