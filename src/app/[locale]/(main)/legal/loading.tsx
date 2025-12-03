import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<main className="relative min-h-screen w-full overflow-hidden bg-black-almost py-22">
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header Section Skeleton */}
				<div className="mb-16 flex flex-col items-center justify-center text-center">
					<Skeleton className="mb-8 h-24 w-full max-w-2xl bg-white/10" />
					<Skeleton className="mb-4 h-16 w-3/4 bg-white/10" />
				</div>

				{/* Content Skeleton */}
				<div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-10">
					<div className="space-y-4">
						{Array.from({ length: 10 }).map((_, i) => (
							<Skeleton
								key={i}
								className={`h-4 w-full bg-white/10 ${
									i % 3 === 0 ? "w-5/6" : i % 3 === 1 ? "w-4/6" : "w-full"
								}`}
							/>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}

