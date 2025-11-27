export default function Loading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-black-almost relative overflow-hidden">
			{/* Glow Effects */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-light opacity-20 blur-3xl -z-10"></div>
			<div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-medium opacity-15 blur-3xl -z-10"></div>

			<div className="relative z-10">
				<div className="w-16 h-16 border-4 border-green-light/30 border-t-green-light rounded-full animate-spin"></div>
			</div>
		</div>
	);
}
