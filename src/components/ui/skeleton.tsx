import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-white/10", className)}
			{...props}
		/>
	);
}

export function PageSkeleton() {
	return (
		<div className="container mx-auto px-6 py-12 space-y-8">
			{/* Title Skeleton */}
			<Skeleton className="h-12 w-3/4 max-w-2xl" />
			
			{/* Description Skeleton */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-full max-w-3xl" />
				<Skeleton className="h-4 w-5/6 max-w-3xl" />
			</div>

			{/* Content Grid Skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{[...Array(6)].map((_, i) => (
					<div key={i} className="space-y-4">
						<Skeleton className="h-48 w-full rounded-lg" />
						<Skeleton className="h-6 w-3/4" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
					</div>
				))}
			</div>
		</div>
	);
}

export function CardSkeleton() {
	return (
		<div className="space-y-4">
			<Skeleton className="h-48 w-full rounded-lg" />
			<Skeleton className="h-6 w-3/4" />
			<Skeleton className="h-4 w-full" />
		</div>
	);
}

export function MenuSkeleton() {
	return (
		<div className="absolute left-0 mt-4 max-w-64 rounded-2xl border border-white/15 bg-black/35 p-4 shadow-2xl space-y-2">
			{[...Array(5)].map((_, i) => (
				<Skeleton key={i} className="h-10 w-full rounded-lg" />
			))}
		</div>
	);
}
