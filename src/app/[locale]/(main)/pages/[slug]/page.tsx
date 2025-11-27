import { notFound } from "next/navigation";
import { getPageBySlug } from "@/services/server/page-service";
import { ComponentRenderer } from "@/components/sections/component-renderer";
import { PageLayout } from "@/components/layouts/page-layout";
import { isValidPageType } from "@/constants/page-types";

interface PageProps {
	params: Promise<{
		slug: string;
		locale: string;
	}>;
}

export default async function DynamicPage({ params }: PageProps) {
	const { slug, locale } = await params;

	// Fetch page data by slug
	let page;
	try {
		page = await getPageBySlug(slug, locale);
	} catch (error) {
		// If page not found, show 404
		console.error(`Page not found for slug: ${slug}`, error);
		notFound();
	}

	// Sort components by sortOrder
	const sortedComponents = page.components.sort(
		(a, b) => a.sortOrder - b.sortOrder
	);

	// Determine page type for layout
	const pageType = isValidPageType(page.type) ? page.type : null;

	return (
		<main className="min-h-screen bg-black-almost text-white">
			<PageLayout pageType={pageType}>
				{/* Page Title and Description */}
				{(page.title || page.excerpt) && (
					<div className="mb-8 space-y-4">
						{page.title && (
							<h1 className="font-rethink text-4xl font-bold text-white sm:text-5xl">
								{page.title}
							</h1>
						)}
						{page.excerpt && (
							<p className="text-lg text-white/80">{page.excerpt}</p>
						)}
					</div>
				)}

				{/* Render Components */}
				{sortedComponents.map((componentWrapper) => (
					<ComponentRenderer
						key={componentWrapper.component.id}
						componentWrapper={componentWrapper}
					/>
				))}
			</PageLayout>
		</main>
	);
}
