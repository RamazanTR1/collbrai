"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronDown,
	ChevronUp,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentAsset } from "@/types/page.types";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface HeroHowItWorkProps {
	title: string;
	assets: ComponentAsset[];
}

const sliderVariants = {
	enter: (direction: number) => ({
		y: direction > 0 ? 80 : -80,
		opacity: 0,
	}),
	center: { y: 0, opacity: 1 },
	exit: (direction: number) => ({
		y: direction > 0 ? -80 : 80,
		opacity: 0,
	}),
};

export function HeroHowItWork({ title, assets }: HeroHowItWorkProps) {
	const t = useTranslations();

	const sortedAssets = useMemo(
		() => [...assets].sort((a, b) => a.sortOrder - b.sortOrder),
		[assets]
	);

	const slides = useMemo(() => {
		const chunked: ComponentAsset[][] = [];
		for (let i = 0; i < sortedAssets.length; i += 2) {
			chunked.push(sortedAssets.slice(i, i + 2));
		}
		return chunked;
	}, [sortedAssets]);

	const [currentSlide, setCurrentSlide] = useState(0);
	const [direction, setDirection] = useState(0);

	if (slides.length === 0) {
		return null;
	}

	const goToPrevious = () => {
		setDirection(-1);
		setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
	};

	const goToNext = () => {
		setDirection(1);
		setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
	};

	return (
		<section className="w-full">
			<div className="relative overflow-y-clip mx-auto items-center flex flex-col gap-16 lg:flex-row lg:items-start">
				{/* Left Column - Title */}
				<div className="flex flex-col lg:items-start gap-6 items-center">
					<Button
						variant="secondary"
						className="mb-4 w-fit text-light-green hover:bg-light-green/10"
					>
						{t("heroHowItWork.howItWork")}
					</Button>
					<div className="text-centerflex max-w-xl flex-col gap-6">
						{title && (
							<h3 className="text-3xl font-rethink leading-tight text-white sm:text-4xl lg:text-5xl">
								{title}
							</h3>
						)}
					</div>
					<div className="flex lg:hidden space-x-6 items-center justify-center w-full">
						<Button
							variant="secondary"
							onClick={goToPrevious}
							className="flex size-12 items-center justify-center transition hover:bg-light-green/20"
							aria-label="Previous"
						>
							<ChevronLeft />
						</Button>
						<Button
							variant="secondary"
							onClick={goToNext}
							className="flex size-12 items-center justify-center transition hover:bg-light-green/20"
							aria-label="Next"
						>
							<ChevronRight />
						</Button>
					</div>
				</div>

				{/* Right Column - Slider */}
				<div className="relative flex overflow-hidden lg:items-end space-x-6 w-full z-10">
					<div className="hidden lg:flex lg:flex-col lg:space-y-4">
						<Button
							variant="secondary"
							onClick={goToPrevious}
							className="flex size-12 items-center justify-center transition hover:bg-light-green/20"
							aria-label="Previous"
						>
							<ChevronUp />
						</Button>
						<Button
							variant="secondary"
							onClick={goToNext}
							className="flex size-12 items-center justify-center transition hover:bg-light-green/20"
							aria-label="Next"
						>
							<ChevronDown />
						</Button>
					</div>
					<div className="w-full">
						<AnimatePresence custom={direction} mode="wait">
							<motion.div
								key={currentSlide}
								custom={direction}
								variants={sliderVariants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{ duration: 0.5, ease: "easeInOut" }}
								className="flex flex-col gap-10 w-full"
							>
								{slides[currentSlide].map((asset, indexWithinSlide) => {
									const isMediaRight = indexWithinSlide === 0;

									const isVideoMedia =
										asset.asset.mime?.startsWith("video/") ||
										asset.asset.mime?.toLowerCase().includes("gif") ||
										/\.(mp4|webm|mov|gif)$/i.test(asset.asset.url);

									return (
										<div key={asset.id} className="relative">
											{isMediaRight && (
												<div className="pointer-events-none absolute inset-0 hidden -z-10 lg:flex items-center justify-center">
													<Image
														src="/how-it-work-blur.svg"
														alt=""
														aria-hidden="true"
														width={600}
														height={600}
														className="object-contain"
													/>
												</div>
											)}
											<div className="relative rounded-[32px] border border-dark-green bg-dark-green/14 p-6">
												<div className="grid gap-6 lg:grid-cols-2 lg:items-center">
													{/* Text */}
													<div
														className={cn(
															"space-y-3",
															isMediaRight ? "order-1" : "order-1 lg:order-2"
														)}
													>
														{asset.asset.title && (
															<h3 className="text-2xl font-semibold text-white">
																{asset.asset.title}
															</h3>
														)}
														{asset.asset.description && (
															<p className="text-sm text-white/70">
																{asset.asset.description}
															</p>
														)}
													</div>

													{/* Media */}
													<div
														className={cn(
															"relative h-56 overflow-hidden rounded-[28px] border border-dark-green/40",
															isMediaRight ? "order-2" : "order-2 lg:order-1"
														)}
													>
														{asset.asset.url ? (
															isVideoMedia ? (
																<video
																	src={asset.asset.url}
																	className="h-full w-full object-cover"
																	autoPlay
																	loop
																	muted
																	playsInline
																/>
															) : (
																<Image
																	src={asset.asset.url}
																	alt={asset.asset.title || "How it works"}
																	fill
																	className="object-cover"
																/>
															)
														) : (
															<div className="flex h-full w-full items-center justify-center text-white/40">
																Media
															</div>
														)}
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
				{
					<Image
						src="/how-it-work-world.svg"
						alt="How it works background"
						width={600}
						height={700}
						className="absolute -bottom-[45%] -left-[10%] hidden lg:block w-auto lg:h-[700px] 2xl:h-[850px] 2xl:-left-[25%] 2xl:-bottom-[50%]"
					/>
				}
			</div>
		</section>
	);
}
