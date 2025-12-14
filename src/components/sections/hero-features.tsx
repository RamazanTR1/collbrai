"use client";

import Image from "next/image";
import { ComponentAsset } from "@/types/page.types";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

interface HeroFeaturesProps {
	title: string;
	description?: string;
	assets: ComponentAsset[];
}

export function HeroFeatures({
	title,
	description,
	assets,
}: HeroFeaturesProps) {
	const t = useTranslations();
	// Sort assets by sortOrder
	const sortedAssets = [...assets].sort((a, b) => a.sortOrder - b.sortOrder);

	// Take first 3 assets for feature cards
	const featureCards = sortedAssets.slice(0, 3);

	return (
		<section className="relative w-full ">
			{/* Background Planet Image */}
			<div className="hidden absolute z-0 inset-0 lg:-bottom-40 2xl:-bottom-28 lg:flex items-center justify-center">
				<div className="relative h-3/4 w-3/4">
					<Image
						src="/features-bg.svg"
						alt="Features background"
						fill
						className="object-contain object-center"
						priority
					/>
				</div>
			</div>

			{/* Content Container */}
			<div className="relative z-10 mx-auto">
				{/* Features Label */}
				<div className="mb-8 flex justify-center">
					<Button
						variant="secondary"
						className="w-fit  text-white hover:bg-light-green/10"
					>
						{t("heroFeatures.features")}
					</Button>
				</div>

				{/* Title */}
				{title && (
					<h2 className="mb-3 text-center text-3xl font-rethink font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
						{title}
					</h2>
				)}

				{/* Subtitle - using component's description (HTML content) */}
				{description && (
					<div
						className="lg:mb-32 mb-26 text-center text-base text-white/80 sm:text-lg"
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				)}

				{/* Feature Cards Grid */}
				{featureCards.length > 0 && (
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
						{featureCards.map((card, index) => (
							<div
								key={card.id}
								className={`relative h-72 overflow-hidden rounded-[27px] lg:shadow-lg border border-dark-green lg:border-none ${
									index === 1 ? "lg:-mt-14" : ""
								}`}
							>
								{/* Card Image */}
								{card.asset.url && (
									<div className="relative h-full w-full">
										<Image
											src={card.asset.url}
											alt={card.asset.title || "Feature image"}
											width={card.asset.width}
											height={card.asset.height}
											unoptimized
											loading="lazy"
											className="h-full w-full object-cover"
										/>
										{/* Gradient Overlay for better text readability */}
										<div className="absolute inset-0 bg-linear-to-t from-very-dark-green/70 via-very-dark-green/50 to-transparent" />
									</div>
								)}

								{/* Card Content - Overlay on Image */}
								<div className="absolute bottom-0 left-0 right-0 p-6">
									{/* Card Title */}
									{card.asset.title && (
										<h3 className="mb-3 text-xl font-semibold text-white">
											{card.asset.title}
										</h3>
									)}

									{/* Card Description */}
									{card.asset.description && (
										<p className="text-sm leading-relaxed text-white/90">
											{card.asset.description}
										</p>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
