import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<main className="min-h-screen bg-black-almost text-white">
			<div className="container mx-auto px-6 py-12">
				{/* Page Title Skeleton */}
				<div className="mb-8 space-y-4">
					<Skeleton className="h-12 w-3/4 bg-white/10" />
					<Skeleton className="h-6 w-1/2 bg-white/10" />
				</div>

				{/* Component Skeletons */}
				<div className="space-y-12">
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="space-y-4">
							<Skeleton className="h-64 w-full bg-white/10" />
							<Skeleton className="h-4 w-full bg-white/10" />
							<Skeleton className="h-4 w-5/6 bg-white/10" />
							<Skeleton className="h-4 w-4/6 bg-white/10" />
						</div>
					))}
				</div>
			</div>
		</main>
	);
}

