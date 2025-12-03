import { routing } from "@/i18n/routing";

interface StructuredDataProps {
	type: "Organization" | "BreadcrumbList";
	locale?: string;
	breadcrumbs?: Array<{ name: string; url: string }>;
}

export function StructuredData({
	type,
	locale = "en",
	breadcrumbs,
}: StructuredDataProps) {
	const baseUrl = "https://collbrai.com";

	if (type === "Organization") {
		const organizationSchema = {
			"@context": "https://schema.org",
			"@type": "Organization",
			name: "Collbrai",
			url: baseUrl,
			logo: `${baseUrl}/logo.png`,
			contactPoint: {
				"@type": "ContactPoint",
				email: "hello@collbrai.com",
				contactType: "Customer Service",
			},
			sameAs: [
				// Add social media links here when available
			],
		};

		return (
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
			/>
		);
	}

	if (type === "BreadcrumbList" && breadcrumbs) {
		const breadcrumbSchema = {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: breadcrumbs.map((crumb, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: crumb.name,
				item: crumb.url,
			})),
		};

		return (
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>
		);
	}

	return null;
}

