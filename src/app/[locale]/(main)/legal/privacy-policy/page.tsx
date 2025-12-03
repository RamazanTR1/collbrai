import { getSettings } from "@/services/server/settings-service";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function PrivacyPolicyPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const settings = await getSettings();

	return (
		<main className="relative min-h-screen w-full overflow-hidden bg-black-almost py-22">
			{/* Background Blur Effect */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-60 pointer-events-none z-[-10]">
				<Image
					src="/how-it-work-blur.svg"
					alt="Background blur"
					width={1006}
					height={698}
					className="object-cover"
					priority
				/>
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header Section */}
				<div className="mb-16 flex flex-col items-center justify-center text-center">
					<div className="mb-8 w-full max-w-2xl opacity-70">
						<Image
							src="/header-logo-light.svg"
							alt="Decoration"
							width={951}
							height={119}
							className="w-full h-auto"
						/>
					</div>
					<h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl font-rethink">
						{t("legal.privacyPolicy")}
					</h1>
				</div>

				{/* Content */}
				<div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-10">
					{settings?.privacyPolicy && (
						<div
							className="prose prose-invert max-w-none text-white/80"
							dangerouslySetInnerHTML={{ __html: settings.privacyPolicy }}
						/>
					)}
				</div>
			</div>
		</main>
	);
}

