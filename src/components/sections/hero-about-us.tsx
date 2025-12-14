"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ComponentAsset } from "@/types/page.types";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface HeroAboutUsProps {
	title: string;
	assets: ComponentAsset[];
}

export function HeroAboutUs({ title, assets }: HeroAboutUsProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const t = useTranslations();
	// Sort assets by sortOrder
	const sortedAssets = [...assets].sort((a, b) => a.sortOrder - b.sortOrder);

	if (sortedAssets.length === 0) {
		return null;
	}

	const currentAsset = sortedAssets[currentIndex];

	const goToPrevious = () => {
		setCurrentIndex((prev) =>
			prev === 0 ? sortedAssets.length - 1 : prev - 1
		);
	};

	const goToNext = () => {
		setCurrentIndex((prev) =>
			prev === sortedAssets.length - 1 ? 0 : prev + 1
		);
	};

	// Parse statistic - format: "25 YEARS OF WORK" -> { number: "25", text: "YEARS OF WORK" }
	// Can also handle: "23" + "ÖDÜL" -> "23 ÖDÜL" -> { number: "23", text: "ÖDÜL" }
	const parseStatistic = (number: string, text: string) => {
		// If both number and text exist, combine and parse
		if (number && text) {
			const combined = `${number} ${text}`;
			const match = combined.match(/^(\d+)\s+(.+)$/);
			if (match) {
				return { number: match[1], text: match[2] };
			}
			return { number, text };
		}
		// If only one exists, try to parse it
		const value = number || text;
		if (value) {
			const match = value.match(/^(\d+)\s+(.+)$/);
			if (match) {
				return { number: match[1], text: match[2] };
			}
			// If it's just a number
			if (/^\d+$/.test(value)) {
				return { number: value, text: "" };
			}
			return { number: "", text: value };
		}
		return { number: "", text: "" };
	};

	// Top statistic: uses asset.title (number) and asset.description (text)
	const topStatistic = parseStatistic(
		currentAsset.asset.title || "",
		currentAsset.asset.description || ""
	);

	// Bottom statistic: uses asset.subdescription (number + text combined)
	const bottomStatistic = parseStatistic(
		currentAsset.asset.subdescription || "",
		""
	);

	return (
		<section className="w-full">
			<div className="mx-auto px-4 lg:px-0">
				{/* Header Section */}
				<div className="mb-14 flex flex-col justify-between lg:flex-row lg:items-stretch">
					{/* Title */}
					{title && (
						<h2 className="max-w-2xl text-2xl font-rethink leading-tight text-white sm:text-3xl lg:text-4xl">
							{title}
						</h2>
					)}

					{/* About us and Navigation Arrows */}
					<div className="mt-14 flex items-center justify-between lg:mt-0 lg:flex-col lg:justify-between">
						<Button
							variant="secondary"
							className="w-fit  text-white hover:bg-light-green/10"
						>
							{t("heroAboutUs.aboutUs")}
						</Button>

						{/* Navigation Arrows */}
						{sortedAssets.length > 1 && (
							<div className="flex gap-4">
								<Button
									variant="ghost"
									onClick={goToPrevious}
									className="flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:bg-light-green/40"
									aria-label="Previous slide"
								>
									<ChevronLeft />
								</Button>
								<Button
									variant="ghost"
									onClick={goToNext}
									className="flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:bg-light-green/40"
									aria-label="Next slide"
								>
									<ChevronRight />
								</Button>
							</div>
						)}
					</div>
				</div>

				{/* Slider Section */}
				<div className="relative">
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* Left Card - Image */}
						<div className="relative h-64 overflow-hidden rounded-lg bg-dark-green/17 lg:h-80">
							<AnimatePresence mode="wait">
								{currentAsset.asset.url && (
									<motion.div
										key={currentAsset.id}
										initial={{ opacity: 0, scale: 1.1 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.9 }}
										transition={{ duration: 0.5, ease: "easeInOut" }}
										className="absolute inset-0"
									>
										<Image
											src={currentAsset.asset.url}
											alt={currentAsset.asset.title || "Hero image"}
											width={currentAsset.asset.width}
											height={currentAsset.asset.height}
											unoptimized
											loading="lazy"
											className="h-full w-full object-cover"
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Right Card - Statistics */}
						<div className="flex flex-col justify-center rounded-lg bg-dark-green/17 border border-dark-green py-8 px-16">
							<AnimatePresence mode="wait">
								<motion.div
									key={`${currentAsset.id}-stats`}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.5, ease: "easeInOut" }}
									className="w-full"
								>
									{/* Top Statistic */}
									{/* Uses asset.title (number) and asset.description (text) */}
									{topStatistic.number && topStatistic.text && (
										<div className="mb-8 text-center">
											<motion.div
												key={`${currentAsset.id}-top-number`}
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ duration: 0.4, delay: 0.1 }}
												className="mb-2 text-5xl font-bold text-white lg:text-6xl"
											>
												{topStatistic.number}
											</motion.div>
											<motion.div
												key={`${currentAsset.id}-top-text`}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.4, delay: 0.2 }}
												className="text-sm uppercase tracking-[0.2em] text-white/80"
											>
												{topStatistic.text}
											</motion.div>
										</div>
									)}

									{/* Divider */}
									{topStatistic.number &&
										topStatistic.text &&
										bottomStatistic.number &&
										bottomStatistic.text && (
											<motion.div
												key={`${currentAsset.id}-divider`}
												initial={{ scaleX: 0 }}
												animate={{ scaleX: 1 }}
												transition={{ duration: 0.3, delay: 0.3 }}
												className="mb-8 h-px w-full bg-white/20 origin-center"
											/>
										)}

									{/* Bottom Statistic */}
									{/* Uses asset.subdescription (parsed: number + text) */}
									{bottomStatistic.number && bottomStatistic.text && (
										<div className="text-center">
											<motion.div
												key={`${currentAsset.id}-bottom-number`}
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ duration: 0.4, delay: 0.4 }}
												className="mb-2 text-5xl font-bold text-white lg:text-6xl"
											>
												{bottomStatistic.number}
											</motion.div>
											<motion.div
												key={`${currentAsset.id}-bottom-text`}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.4, delay: 0.5 }}
												className="text-sm uppercase tracking-[0.2em] text-white/80"
											>
												{bottomStatistic.text}
											</motion.div>
										</div>
									)}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
