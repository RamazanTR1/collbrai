import { MetadataRoute } from "next";
import { getPages as getPagesServer } from "@/services/server/page-service";
import { PAGE_TYPES } from "@/constants/page-types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://collbrai.com";
	const locales = ["tr", "en"];

	// Static pages
	const staticPages = [""];

	const sitemap: MetadataRoute.Sitemap = [];

	// Add static pages for each locale
	locales.forEach((locale) => {
		staticPages.forEach((page) => {
			sitemap.push({
				url: `${baseUrl}/${locale}${page}`,
				lastModified: new Date(),
				changeFrequency: page === "" ? "daily" : "weekly",
				priority: page === "" ? 1 : 0.8,
				alternates: {
					languages: Object.fromEntries(
						locales.map((l) => [l, `${baseUrl}/${l}${page}`])
					),
				},
			});
		});
	});

	// Fetch and add dynamic pages
	try {
		// Get all page types
		const pageTypes = [PAGE_TYPES.HOMEPAGE];

		for (const pageType of pageTypes) {
			try {
				const response = await getPagesServer({
					type: pageType,
					page: 0,
					size: 100, // Get up to 100 pages per type
					sort: "createdAt,DESC",
				});

				response.content.forEach((page) => {
					locales.forEach((locale) => {
						sitemap.push({
							url: `${baseUrl}/${locale}/page/${page.slug}`,
							lastModified: new Date(),
							changeFrequency: "weekly",
							priority: 0.7,
							alternates: {
								languages: Object.fromEntries(
									locales.map((l) => [l, `${baseUrl}/${l}/page/${page.slug}`])
								),
							},
						});
					});
				});
			} catch {
				// Continue with next page type if one fails
			}
		}
	} catch {
		// Silently fail - return static pages only
	}

	return sitemap;
}
