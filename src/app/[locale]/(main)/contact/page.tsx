import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { generateMetadata as genMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

interface ContactPageProps {
	params: Promise<{
		locale: string;
	}>;
}

export async function generateMetadata({
	params,
}: ContactPageProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "contact" });
	
	return genMetadata({
		title: t("title"),
		description: t("description"),
		locale: locale,
		path: "/contact",
	});
}

export default async function ContactPage({
	params,
}: ContactPageProps) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "contact" });

	return (
		<main className="relative min-h-screen w-full overflow-hidden bg-black-almost py-22" id="main-content">
			{/* Background Blur Effect */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-60 pointer-events-none z-[-10]">
				<Image
					src="/how-it-work-blur.svg"
					alt="Background blur"
					width={1006}
					height={698}
					unoptimized
					loading="lazy"
					className="object-cover"
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
							unoptimized
							loading="lazy"
							className="w-full h-auto"
						/>
					</div>
					<h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl font-rethink">
						{t("title")}
					</h1>
					<p className="max-w-2xl text-lg text-white/70">{t("description")}</p>
				</div>

				<div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
					{/* Contact Form */}
					<ContactForm />

					{/* Contact Info */}
					<div className="flex flex-col justify-center gap-12">
						<div className="space-y-8">
							<h2 className="text-2xl font-semibold text-white">
								{t("info.title")}
							</h2>

							<div className="flex items-start gap-4">
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-green/10 text-light-green">
									<Mail className="h-6 w-6" />
								</div>
								<div>
									<h3 className="font-medium text-white">{t("info.email")}</h3>
									<p className="mt-1 text-white/70">hello@collbrai.com</p>
									<p className="text-white/70">support@collbrai.com</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-green/10 text-light-green">
									<Phone className="h-6 w-6" />
								</div>
								<div>
									<h3 className="font-medium text-white">{t("info.phone")}</h3>
									<p className="mt-1 text-white/70">+1 (555) 123-4567</p>
									<p className="text-white/70">+1 (555) 987-6543</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-green/10 text-light-green">
									<MapPin className="h-6 w-6" />
								</div>
								<div>
									<h3 className="font-medium text-white">
										{t("info.address")}
									</h3>
									<p className="mt-1 text-white/70">
										123 Innovation Street, Tech Valley
										<br />
										San Francisco, CA 94103
									</p>
								</div>
							</div>
						</div>

						{/* Map or Decor */}
						<div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
							{/* Placeholder for Map or additional image */}
							<div className="absolute inset-0 flex items-center justify-center text-white/20">
								<MapPin className="h-16 w-16" />
							</div>
							<div className="absolute inset-0 bg-linear-to-t from-black-almost/80 to-transparent pointer-events-none" />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
