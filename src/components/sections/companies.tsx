"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { ComponentAsset } from "@/types/page.types";

interface CompaniesProps {
	title: string;
	assets: ComponentAsset[];
}

export function Companies({ title, assets }: CompaniesProps) {
	// Sort assets by sortOrder
	const sortedAssets = [...assets].sort((a, b) => a.sortOrder - b.sortOrder);

	// Duplicate assets multiple times for seamless infinite scroll
	// We need enough duplicates to ensure smooth scrolling
	const duplicatedAssets = [
		...sortedAssets,
		...sortedAssets,
		...sortedAssets,
		...sortedAssets,
	];

	return (
		<section className="w-full overflow-hidden">
			<div className="mx-auto">
				{/* Stars */}
				<div className="mb-4 flex justify-center gap-1">
					{[...Array(4)].map((_, i) => (
						<Star
							key={i}
							className="h-5 w-5 fill-[#FFD700] text-[#FFD700]"
							size={20}
						/>
					))}
				</div>

				{/* Title */}
				{title && (
					<p className="mb-8 text-center text-sm text-light-gray">{title}</p>
				)}

				{/* Infinite Scrolling Company Logos */}
				{sortedAssets.length > 0 && (
					<div className="relative overflow-hidden py-8">
						<div className="flex animate-infinite-scroll gap-8 md:gap-12">
							{/* First set */}
							{duplicatedAssets.map((componentAsset, index) => (
								<div
									key={`first-${componentAsset.id}-${index}`}
									className="flex min-w-0 flex-shrink-0 items-center justify-center"
								>
									<Image
										src={componentAsset.asset.url}
										alt={componentAsset.asset.title || "Company logo"}
										width={220}
										height={80}
										loading="lazy"
										className="h-auto w-auto object-contain opacity-70 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
										style={{
											maxWidth: "300px",
										}}
									/>
								</div>
							))}
							{/* Duplicate set for seamless loop */}
							{duplicatedAssets.map((componentAsset, index) => (
								<div
									key={`second-${componentAsset.id}-${index}`}
									className="flex min-w-0 flex-shrink-0 items-center justify-center"
								>
									<Image
										src={componentAsset.asset.url}
										alt={componentAsset.asset.title || "Company logo"}
										width={220}
										height={80}
										loading="lazy"
										className="h-auto w-auto object-contain opacity-70 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
										style={{
											maxWidth: "300px",
										}}
									/>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
			<style jsx>{`
				@keyframes infinite-scroll {
					from {
						transform: translateX(0);
					}
					to {
						transform: translateX(-50%);
					}
				}

				.animate-infinite-scroll {
					animation: infinite-scroll 40s linear infinite;
					width: fit-content;
					display: flex;
				}

				.animate-infinite-scroll:hover {
					animation-play-state: paused;
				}
			`}</style>
		</section>
	);
}
