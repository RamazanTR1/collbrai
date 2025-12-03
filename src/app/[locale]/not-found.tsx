import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-black-almost px-4 text-white" id="main-content">
			<div className="max-w-md text-center">
				<h1 className="mb-4 text-6xl font-bold text-light-green">404</h1>
				<h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
				<p className="mb-8 text-white/70">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
					<Button asChild className="bg-light-green text-black hover:bg-light-green/90">
						<Link href="/">
							<Home className="mr-2 h-4 w-4" />
							Go Home
						</Link>
					</Button>
					<Button asChild variant="ghost" className="text-white hover:bg-white/10">
						<Link href="/contact">
							<Search className="mr-2 h-4 w-4" />
							Contact Us
						</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
