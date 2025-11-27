"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-black-almost relative overflow-hidden">
			{/* Glow Effects */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-light opacity-20 blur-3xl -z-10"></div>
			<div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-medium opacity-15 blur-3xl -z-10"></div>

			<div className="relative text-center z-10">
				<h1 className="text-6xl font-rethink font-bold text-green-light mb-4">
					Oops!
				</h1>
				<p className="text-white/80 text-lg mb-8 font-sans">
					Something went wrong
				</p>
				<Button onClick={reset} variant="default">
					Try again
				</Button>
			</div>
		</div>
	);
}
