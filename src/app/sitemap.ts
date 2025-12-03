import { MetadataRoute } from "next";
import { getPages } from "@/services/server/page-service";
import { Page } from "@/types/page.types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://collbrai.com";
	const locales = ["tr", "en"];
	const now = new Date();

	const sitemap: MetadataRoute.Sitemap = [];

	// Add static pages for each locale
	locales.forEach((locale) => {
		// Homepage - highest priority
		sitemap.push({
			url: `${baseUrl}/${locale}`,
			lastModified: now,
			changeFrequency: "daily",
			priority: 1.0,
			alternates: {
				languages: Object.fromEntries(
					locales.map((l) => [l, `${baseUrl}/${l}`])
				),
			},
		});

		// Contact page - high priority
		sitemap.push({
			url: `${baseUrl}/${locale}/contact`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
			alternates: {
				languages: Object.fromEntries(
					locales.map((l) => [l, `${baseUrl}/${l}/contact`])
				),
			},
		});
	});

	// Fetch and add dynamic pages
	try {
		// Fetch all pages (excluding homepage)
		const response = await getPages({
			page: 0,
			size: 100,
			sort: "createdAt,DESC",
		});

		response.content.forEach((page: Page) => {
			// Skip homepage as it's already in static pages
			if (page.type === "Ana Sayfa") {
				return;
			}

			// Determine priority based on page type or default
			const priority = 0.7;
			const changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "weekly";

			// You can adjust priorities based on page types here
			// For example, if you have news pages, they might be daily
			// if (page.type === "News") {
			//   changeFrequency = "daily";
			//   priority = 0.8;
			// }

			locales.forEach((locale) => {
				sitemap.push({
					url: `${baseUrl}/${locale}/pages/${page.slug}`,
					lastModified: now,
					changeFrequency,
					priority,
					alternates: {
						languages: Object.fromEntries(
							locales.map((l) => [l, `${baseUrl}/${l}/pages/${page.slug}`])
						),
					},
				});
			});
		});
	} catch (error) {
		// Log error but continue with static pages
		console.error("Error fetching pages for sitemap:", error);
	}

	// Sort sitemap by priority (highest first) for better SEO
	sitemap.sort((a, b) => (b.priority || 0.5) - (a.priority || 0.5));

	return sitemap;
}
