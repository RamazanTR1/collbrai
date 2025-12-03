import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://collbrai.com";
const siteName = "Collbrai";
const defaultDescription = {
	en: "Scale With Smart AI Systems - Whether you're a startup or enterprise, our AI grows with you—offering scalable automation and optimization tools.",
	tr: "Akıllı AI Sistemleri ile Ölçeklenin - İster startup ister kurumsal olun, AI'mız sizinle birlikte büyür—ölçeklenebilir otomasyon ve optimizasyon araçları sunar.",
};

export interface MetadataOptions {
	title: string;
	description?: string;
	locale?: string;
	path?: string;
	image?: string;
	noIndex?: boolean;
}

export function generateMetadata({
	title,
	description,
	locale = "en",
	path = "",
	image,
	noIndex = false,
}: MetadataOptions): Metadata {
	const localeDescription = description || defaultDescription[locale as "en" | "tr"] || defaultDescription.en;
	const url = `${baseUrl}/${locale}${path}`;
	const ogImage = image || `${baseUrl}/og-image.jpg`;

	const metadata: Metadata = {
		metadataBase: new URL(baseUrl),
		title: {
			default: title,
			template: `%s | ${siteName}`,
		},
		description: localeDescription,
		alternates: {
			canonical: url,
			languages: Object.fromEntries(
				routing.locales.map((loc) => [
					loc,
					`${baseUrl}/${loc}${path}`,
				])
			),
		},
		openGraph: {
			type: "website",
			locale: locale,
			url: url,
			siteName: siteName,
			title: title,
			description: localeDescription,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: title,
			description: localeDescription,
			images: [ogImage],
		},
		robots: {
			index: !noIndex,
			follow: !noIndex,
			googleBot: {
				index: !noIndex,
				follow: !noIndex,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
	};

	return metadata;
}

