/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      // { hostname: "source.unsplash.com" },
    ],
  },
  env: {
    KEY_SENDGRID: "LA CLE API",
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/fr",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
