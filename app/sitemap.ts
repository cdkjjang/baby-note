import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/calc/parental-leave`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/calc/benefits`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/calc/vaccine`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/calc/work-reduction`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/guide`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const guidePages: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${SITE_URL}/guide/${g.slug}`,
    lastModified: g.updated,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...guidePages];
}
