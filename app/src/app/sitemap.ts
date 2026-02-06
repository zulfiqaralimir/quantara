import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://quantara-nine.vercel.app";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/analysis`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/visuals`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/research`,
      lastModified: new Date(),
    },
  ];
}
