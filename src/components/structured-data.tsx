import { baseUrl } from "@/lib/metadata";

interface StructuredDataProps {
	type: "Organization" | "BreadcrumbList" | "SoftwareApplication";
	locale?: string;
	breadcrumbs?: Array<{ name: string; url: string }>;
}

export function StructuredData({
	type,
	locale = "en",
	breadcrumbs,
}: StructuredDataProps) {

	if (type === "Organization") {
		const organizationSchema = {
			"@context": "https://schema.org",
			"@type": "Organization",
			name: "Collbrai",
			url: baseUrl,
			logo: `${baseUrl}/icon.png`, // Updated to use icon as logo fallback
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

	if (type === "SoftwareApplication") {
		const softwareSchema = {
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			name: "Collbrai",
			applicationCategory: "BusinessApplication",
			operatingSystem: "Web",
			description:
				locale === "tr"
					? "İşletmeler için ölçeklenebilir yapay zeka ve otomasyon çözümleri."
					: "Scalable AI and automation solutions for businesses.",
			url: baseUrl,
			offers: {
				"@type": "Offer",
				price: "0",
				priceCurrency: "USD",
			},
		};

		return (
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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

