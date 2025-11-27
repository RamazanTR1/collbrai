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

	return (
		<section className="w-full">
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

				{/* Company Logos Grid */}
				{sortedAssets.length > 0 && (
					<div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
						{sortedAssets.map((componentAsset) => (
							<div
								key={componentAsset.id}
								className="flex items-center justify-center"
							>
								<Image
									src={componentAsset.asset.url}
									alt={componentAsset.asset.title || "Company logo"}
									width={120}
									height={40}
									className="h-auto max-h-8 w-auto object-contain opacity-70 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
									style={{
										maxWidth: "150px",
									}}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
