"use client";

import Image from "next/image";
import { ComponentAsset } from "@/types/page.types";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";

interface HeroChooseProps {
	title: string;
	description?: string;
	assets: ComponentAsset[];
}

export function HeroChoose({ title, description, assets }: HeroChooseProps) {
	const t = useTranslations();
	// Sort assets by sortOrder
	const sortedAssets = [...assets].sort((a, b) => a.sortOrder - b.sortOrder);

	// Check if asset is a video file
	const isVideo = (mime: string, url: string) => {
		const videoMimeTypes = ["video/", "image/gif"];
		const videoExtensions = [".mp4", ".webm", ".mov", ".avi", ".gif"];
		return (
			videoMimeTypes.some((type) => mime.toLowerCase().includes(type)) ||
			videoExtensions.some((ext) => url.toLowerCase().endsWith(ext))
		);
	};

	return (
		<section className="relative w-full ">
			<div className="mx-auto">
				{/* Top Section - Title and Description */}
				<div className="mb-12 space-y-10 lg:space-y-0">
					{/* Mobile layout */}
					<div className="flex flex-col gap-4 lg:hidden">
						<Button
							variant="secondary"
							className="w-fit text-white hover:bg-light-green/10"
						>
							{t("heroChoose.whyChooseUs")}
						</Button>
						{title && (
							<h2 className="text-3xl font-rethink font-semibold leading-tight text-white sm:text-4xl">
								{title}
							</h2>
						)}
						{description && (
							<div
								className="text-base text-white/70 sm:text-lg"
								dangerouslySetInnerHTML={{ __html: description }}
							/>
						)}
						<Button
							variant="ghost"
							className="group px-0 flex items-center gap-2 w-fit border-none text-light-green underline decoration-light-green underline-offset-4 hover:bg-transparent hover:no-underline"
						>
							{t("heroChoose.moreBenefit")}
							<ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
						</Button>
					</div>

					{/* Desktop layout */}
					<div className="hidden grid-cols-1 gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
						{/* Left Section - Why Choose Us */}
						<div className="flex flex-col">
							<Button
								variant="secondary"
								className="mb-4 w-fit text-white hover:bg-light-green/10"
							>
								{t("heroChoose.whyChooseUs")}
							</Button>
							{description && (
								<div
									className="text-base text-white/70 sm:text-lg"
									dangerouslySetInnerHTML={{ __html: description }}
								/>
							)}
						</div>

						{/* Right Section - Title and More Benefit Link */}
						<div className="flex flex-col items-end justify-start">
							{title && (
								<h2 className="mb-4 text-right text-3xl font-rethink font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
									{title}
								</h2>
							)}
							<Button
								variant="ghost"
								className="group flex items-center gap-2 w-fit border-none text-light-green underline decoration-light-green underline-offset-4 hover:bg-transparent hover:no-underline"
							>
								{t("heroChoose.moreBenefit")}
								<ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
							</Button>
						</div>
					</div>
				</div>

				{/* Bottom Section - Video Cards */}
				{sortedAssets.length > 0 && (
					<div className="flex flex-col gap-6 lg:flex-row">
						{sortedAssets.map((card, index) => (
							<div
								key={card.id}
								className={`flex flex-1 flex-col overflow-hidden rounded-lg border border-dark-green ${
									index === 1 ? "bg-dark-green/17" : "bg-transparent"
								}`}
							>
								{/* Card Title - Top */}
								{card.asset.title && (
									<div className="p-6">
										<h3 className="text-xl font-semibold text-white">
											{card.asset.title}
										</h3>
									</div>
								)}

								{/* Card Media (Video) - Middle */}
								{card.asset.url && (
									<div className="relative h-64 w-full p-6">
										{isVideo(card.asset.mime, card.asset.url) ? (
											<video
												src={card.asset.url}
												className="h-full w-full rounded-lg object-cover"
												autoPlay
												loop
												muted
												playsInline
											/>
										) : (
											<Image
												src={card.asset.url}
												alt={card.asset.title || "Feature image"}
												fill
												loading="lazy"
												sizes="(max-width: 1024px) 100vw, 50vw"
												className="rounded-lg object-cover"
											/>
										)}
									</div>
								)}

								{/* Card Description - Bottom */}
								{card.asset.description && (
									<div className="p-6">
										<p className="text-sm leading-relaxed text-white/70">
											{card.asset.description}
										</p>
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
