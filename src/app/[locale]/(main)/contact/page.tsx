"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
	const t = useTranslations("contact");
	const [legal, setLegal] = useState(false);
	const [keepInTouch, setKeepInTouch] = useState(false);

	return (
		<main className="relative min-h-screen w-full overflow-hidden bg-black-almost py-22">
			{/* Background Blur Effect */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-60 pointer-events-none z-0">
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
						{t("title")}
					</h1>
					<p className="max-w-2xl text-lg text-white/70">{t("description")}</p>
				</div>

				<div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
					{/* Contact Form */}
					<div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-10">
						<form className="flex flex-col gap-5">
							{/* Name Row */}
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
								<div className="space-y-2">
									<label className="text-sm font-medium text-white/80">
										{t("form.firstname")}
									</label>
									<Input
										placeholder={t("form.firstname")}
										className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-white/80">
										{t("form.lastname")}
									</label>
									<Input
										placeholder={t("form.lastname")}
										className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
									/>
								</div>
							</div>

							{/* Company Info */}
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
								<div className="space-y-2">
									<label className="text-sm font-medium text-white/80">
										{t("form.companyName")}
									</label>
									<Input
										placeholder={t("form.companyName")}
										className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-white/80">
										{t("form.companyMail")}
									</label>
									<Input
										type="email"
										placeholder={t("form.companyMail")}
										className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
									/>
								</div>
							</div>

							{/* Sector & Unit */}
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
								<div className="space-y-2">
									<label className="text-sm font-medium text-white/80">
										{t("form.sector")}
									</label>
									<Input
										placeholder={t("form.sector")}
										className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-white/80">
										{t("form.unit")}
									</label>
									<Input
										placeholder={t("form.unit")}
										className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
									/>
								</div>
							</div>

							{/* Location */}
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
								<div className="space-y-2">
									<label className="text-sm font-medium text-white/80">
										{t("form.country")}
									</label>
									<Input
										placeholder={t("form.country")}
										className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-white/80">
										{t("form.city")}
									</label>
									<Input
										placeholder={t("form.city")}
										className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
									/>
								</div>
							</div>

							{/* Phone */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-white/80">
									{t("form.phoneNumber")}
								</label>
								<Input
									type="tel"
									placeholder={t("form.phoneNumber")}
									className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
								/>
							</div>

							{/* Message */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-white/80">
									{t("form.message")}
								</label>
								<textarea
									placeholder={t("form.message")}
									rows={4}
									className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-white/40 focus:border-light-green/50 focus:outline-none focus:ring-0"
								/>
							</div>

							{/* Checkboxes */}
							<div className="space-y-3">
								<label className="flex items-start gap-3 cursor-pointer">
									<input
										type="checkbox"
										checked={legal}
										onChange={(e) => setLegal(e.target.checked)}
										className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-light-green focus:ring-light-green/50"
									/>
									<span className="text-sm text-white/70">
										{t("form.legal")}
									</span>
								</label>
								<label className="flex items-start gap-3 cursor-pointer">
									<input
										type="checkbox"
										checked={keepInTouch}
										onChange={(e) => setKeepInTouch(e.target.checked)}
										className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-light-green focus:ring-light-green/50"
									/>
									<span className="text-sm text-white/70">
										{t("form.keepInTouch")}
									</span>
								</label>
							</div>

							<Button className="mt-2 w-full bg-light-green py-6 text-lg font-semibold text-black hover:bg-light-green/90 rounded-xl">
								{t("form.send")}
								<Send className="ml-2 h-5 w-5" />
							</Button>
						</form>
					</div>

					{/* Contact Info */}
					<div className="flex flex-col justify-center gap-12">
						<div className="space-y-8">
							<h3 className="text-2xl font-semibold text-white">
								{t("info.title")}
							</h3>

							<div className="flex items-start gap-4">
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-green/10 text-light-green">
									<Mail className="h-6 w-6" />
								</div>
								<div>
									<h4 className="font-medium text-white">{t("info.email")}</h4>
									<p className="mt-1 text-white/70">hello@collbrai.com</p>
									<p className="text-white/70">support@collbrai.com</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-green/10 text-light-green">
									<Phone className="h-6 w-6" />
								</div>
								<div>
									<h4 className="font-medium text-white">{t("info.phone")}</h4>
									<p className="mt-1 text-white/70">+1 (555) 123-4567</p>
									<p className="text-white/70">+1 (555) 987-6543</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-green/10 text-light-green">
									<MapPin className="h-6 w-6" />
								</div>
								<div>
									<h4 className="font-medium text-white">
										{t("info.address")}
									</h4>
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
