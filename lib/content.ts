import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content");

export type ServiceDoc = {
  slug: string;
  title: string;
  summary: string;
  kpi: string;
  order: number;
  icon: string;
  deliverables: string[];
  body: string;
};

export type BlogDoc = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingTime: number;
  body: string;
};

export type CaseStudyDoc = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  services: string[];
  metrics: { label: string; value: string; delta?: string }[];
  publishedAt: string;
  featured?: boolean;
  excerpt: string;
  body: string;
};

function readDir(kind: "services" | "case-studies" | "blog") {
  const dir = path.join(ROOT, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => {
      const full = path.join(dir, f);
      const raw = fs.readFileSync(full, "utf8");
      const { data, content } = matter(raw);
      return { slug: f.replace(/\.(mdx|md)$/, ""), data, body: content };
    });
}

export function getAllServices(): ServiceDoc[] {
  return readDir("services")
    .map((r) => ({
      slug: r.slug,
      title: r.data.title,
      summary: r.data.summary,
      kpi: r.data.kpi,
      order: Number(r.data.order ?? 99),
      icon: r.data.icon,
      deliverables: r.data.deliverables ?? [],
      body: r.body,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getService(slug: string): ServiceDoc | undefined {
  return getAllServices().find((s) => s.slug === slug);
}

export function getAllCaseStudies(): CaseStudyDoc[] {
  return readDir("case-studies")
    .map((r) => ({
      slug: r.slug,
      title: r.data.title,
      client: r.data.client,
      industry: r.data.industry,
      duration: r.data.duration,
      services: r.data.services ?? [],
      metrics: r.data.metrics ?? [],
      publishedAt: r.data.publishedAt,
      featured: r.data.featured ?? false,
      excerpt: r.data.excerpt,
      body: r.body,
    }))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getCaseStudy(slug: string): CaseStudyDoc | undefined {
  return getAllCaseStudies().find((s) => s.slug === slug);
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function getAllBlogPosts(): BlogDoc[] {
  return readDir("blog")
    .map((r) => ({
      slug: r.slug,
      title: r.data.title,
      excerpt: r.data.excerpt,
      author: r.data.author ?? "Suraj Malthumkar",
      publishedAt: r.data.publishedAt,
      updatedAt: r.data.updatedAt,
      tags: r.data.tags ?? [],
      readingTime: estimateReadingTime(r.body),
      body: r.body,
    }))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getBlogPost(slug: string): BlogDoc | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}

export function extractHeadings(markdown: string) {
  const lines = markdown.split("\n");
  const headings: { depth: number; text: string; id: string }[] = [];
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ depth, text, id });
  }
  return headings;
}
