import type { Metadata } from "next";
import { siteConfig } from "./utils";

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
} = {}): Metadata {
  const fullTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.name;
  const desc = description ?? siteConfig.description;
  const url = `${siteConfig.url}${path}`;
  const ogImage =
    image ?? `${siteConfig.url}/og?title=${encodeURIComponent(title ?? siteConfig.tagline)}`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description: desc,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    // Icons are auto-discovered from app/icon.tsx (Next 13+ convention).
  };
}
