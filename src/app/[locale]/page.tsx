import { Button } from "@/components/ui/button";
import { ArrowUpRight, Play } from "lucide-react";
import { getPageBySlug } from "@/services/server/page-service";
import { PAGE_TYPES } from "@/constants/page-types";
import { ComponentRenderer } from "@/components/sections/component-renderer";
import { PageLayout } from "@/components/layouts/page-layout";
import { getTranslations } from "next-intl/server";

interface HomePageProps {
	params: Promise<{
		locale: string;
	}>;
}

export default async function HomePage({ params }: HomePageProps) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "hero" });

	// Fetch homepage data from backend using slug
	// Backend'de ana sayfa "ana-sayfa" slug'ı ile oluşturulmuş
	let page = null;
	try {
		page = await getPageBySlug("ana-sayfa", locale);
	} catch (error) {
		// If page not found or error, still show static hero
		console.error("Failed to fetch homepage data:", error);
	}

	// Sort components by sortOrder
	const sortedComponents =
		page?.components.sort((a, b) => a.sortOrder - b.sortOrder) || [];

	return (
		<main className="relative flex flex-col overflow-x-clip text-white hero-bg">
			{/* Static Hero Section */}
			<section className="relative z-10 flex min-h-screen flex-col justify-center">
				<div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
					<div className="space-y-2 text-center uppercase tracking-[0.3em] text-sm text-white/60">
						<p>{t("tagline")}</p>
					</div>
					<div className="flex flex-col items-center gap-8 text-center">
						<h1 className="font-rethink text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
							<span className="block tracking-wider">{t("titleLine1")}</span>
							<span className="block text-light-green tracking-wider">
								{t("titleLine2")}
							</span>
						</h1>
						<p className="max-w-2xl text-base text-white/80 lg:text-lg ">
							{t("description")}
						</p>
						<Button className="group flex items-center mt-5 gap-2 text-base">
							{t("contactUs")}
							<ArrowUpRight className="h-5! w-5! transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
						</Button>
					</div>

					<div className="flex flex-col gap-10 mt-[110px] md:flex-row md:items-center md:justify-between">
						<div className="flex flex-col gap-6 text-sm uppercase tracking-[0.2em] text-white/70">
							<div className="flex items-center gap-4">
								<div className="h-px w-10 bg-light-green flex-shrink-0" />
								<p>{t("futureReady")}</p>
							</div>
							<div className="flex items-center gap-4">
								<div className="h-px w-10 bg-light-green flex-shrink-0" />
								<p>{t("support247")}</p>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<div className="flex h-14 w-14 items-center justify-center rounded-full border border-light-green/40 bg-black-almost/60 text-light-green transition hover:scale-105 flex-shrink-0">
								<Play className="h-5! w-5! fill-light-green/30" />
							</div>
							<p className="text-sm text-white/70">{t("watchAI")}</p>
						</div>
					</div>
				</div>
			</section>

			{/* Backend Components Section */}
			{sortedComponents.length > 0 && (
				<section className="w-full">
					<PageLayout pageType={PAGE_TYPES.HOMEPAGE}>
						{sortedComponents.map((componentWrapper) => (
							<ComponentRenderer
								key={componentWrapper.component.id}
								componentWrapper={componentWrapper}
							/>
						))}
					</PageLayout>
				</section>
			)}
		</main>
	);
}
