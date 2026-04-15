import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/utils";
import { getAllServices, getAllCaseStudies } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = ["", "/about", "/services", "/case-studies", "/pricing", "/blog", "/contact"].map(
    (p) => ({
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.8,
    }),
  );

  const serviceRoutes = getAllServices().map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyRoutes = getAllCaseStudies().map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    lastModified: new Date(c.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes];
}
