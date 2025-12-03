"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ComponentAsset } from "@/types/page.types";
import { Button } from "@/components/ui/button";

interface HeroCTAProps {
	title: string;
	description?: string;
	assets: ComponentAsset[];
}

export function HeroCTA({ title, description, assets }: HeroCTAProps) {
	const t = useTranslations();
	const firstMedia = assets[0];
	const secondMedia = assets[1];

	return (
		<section className="w-full ">
			<div className="mx-auto grid gap-10 lg:grid-cols-3 lg:gap-12 ">
				{/* Left Content + Primary Media */}
				<div className="flex flex-row gap-1 lg:col-span-2 border border-very-dark-green bg-very-dark-green/30 rounded-[40px] p-8 min-h-[540px] items-stretch">
					{/* TODO: icon chips - sample usage left for future */}
					{/*
					<div className="flex gap-4">
						<div className="flex size-12 items-center justify-center rounded-full border border-light-green/40 text-light-green">
							Icon
						</div>
						...
					</div>
					*/}
					<div className="flex w-full max-w-sm flex-col gap-6 justify-center">
						{description && (
							<div
								className="text-light-green text-lg font-semibold"
								dangerouslySetInnerHTML={{ __html: description }}
							/>
						)}

						{title && (
							<h2 className="text-3xl font-rethink leading-tight text-white sm:text-4xl lg:text-5xl">
								{title}
							</h2>
						)}
					</div>
					<div className="relative flex-1 rounded-[32px]">
						{firstMedia?.asset.url && (
							<Image
								src={firstMedia.asset.url}
								alt={firstMedia.asset.title || "Hero media"}
								fill
								className="rounded-[32px] object-cover border border-dark-green"
							/>
						)}
					</div>
				</div>

				{/* Right column: Secondary media + CTA */}
				<div className="flex flex-col items-center gap-8 lg:col-span-1">
					<div className="relative h-80 lg:h-52 w-full rounded-[32px] border border-light-green">
						{secondMedia?.asset.url && (
							<Image
								src={secondMedia.asset.url}
								alt={secondMedia.asset.title || "Hero media"}
								fill
								loading="lazy"
								sizes="(max-width: 1024px) 100vw, 33vw"
								className="rounded-[32px] object-cover p-4"
							/>
						)}
					</div>

					<Button className="group flex items-center justify-center gap-3 text-lg px-4 py-6">
						{t("heroCTA.getStartedNow")}
						<div className="flex items-center justify-center rounded-md bg-medium-green p-2 text-white transition group-hover:bg-light-green group-hover:text-black">
							<ArrowUpRight className="size-5!" />
						</div>
					</Button>
				</div>
			</div>
		</section>
	);
}
