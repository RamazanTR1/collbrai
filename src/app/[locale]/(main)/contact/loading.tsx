import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<main className="relative min-h-screen w-full overflow-hidden bg-black-almost py-22">
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header Section Skeleton */}
				<div className="mb-16 flex flex-col items-center justify-center text-center">
					<Skeleton className="mb-8 h-24 w-full max-w-2xl bg-white/10" />
					<Skeleton className="mb-4 h-16 w-3/4 bg-white/10" />
					<Skeleton className="h-6 w-1/2 bg-white/10" />
				</div>

				<div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
					{/* Form Skeleton */}
					<div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-10">
						<div className="flex flex-col gap-5">
							{Array.from({ length: 8 }).map((_, i) => (
								<div key={i} className="space-y-2">
									<Skeleton className="h-4 w-24 bg-white/10" />
									<Skeleton className="h-12 w-full bg-white/10" />
								</div>
							))}
							<Skeleton className="mt-2 h-14 w-full bg-white/10" />
						</div>
					</div>

					{/* Contact Info Skeleton */}
					<div className="flex flex-col justify-center gap-12">
						<div className="space-y-8">
							<Skeleton className="h-8 w-48 bg-white/10" />
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="flex items-start gap-4">
									<Skeleton className="h-12 w-12 rounded-full bg-white/10" />
									<div className="space-y-2 flex-1">
										<Skeleton className="h-5 w-24 bg-white/10" />
										<Skeleton className="h-4 w-40 bg-white/10" />
										<Skeleton className="h-4 w-40 bg-white/10" />
									</div>
								</div>
							))}
						</div>
						<Skeleton className="h-64 w-full rounded-2xl bg-white/10" />
					</div>
				</div>
			</div>
		</main>
	);
}

