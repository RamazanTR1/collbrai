import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default async function NotFound() {
	const locale = await getLocale();
	const t = await getTranslations({ locale });

	return (
		<main className="relative min-h-screen w-full overflow-hidden bg-black-almost flex items-start justify-center sm:pt-20 pt-16" id="main-content">
			{/* Background Blur Effect */}
			<div className="absolute sm:top-0 top-14 left-1/2 -translate-x-1/2 opacity-60 pointer-events-none -z-10">
				<Image
					src="/how-it-work-blur.svg"
					alt="Background blur"
					width={1006}
					height={698}
					unoptimized
					className="object-contain"
					priority
				/>
			</div>

			<div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
				{/* Header Logo */}
				<div className=" mb-8 w-full max-w-3xl mx-auto opacity-70 ">
					<Image
						src="/header-logo-light.svg"
						alt="Decoration"
						width={951}
						height={119}
						unoptimized
						className="w-full h-auto"
						priority
					/>
				</div>

				{/* 404 Content */}
				<div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-12">
					<h1 className="text-8xl md:text-9xl font-bold text-light-green mb-4 font-rethink">
						404
					</h1>
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-rethink">
						{t("notFound.title")}
					</h2>
					<p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
						{t("notFound.description")}
					</p>

					<Link href="/">
						<Button
							variant="default"
							size="lg"
							className="bg-light-green text-very-dark-green hover:bg-light-green/90"
						>
							<Home className="w-5 h-5 mr-2" />
							{t("notFound.goHome")}
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
