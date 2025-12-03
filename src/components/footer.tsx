"use client";

import { useTranslations } from "next-intl";
import {
	ArrowRight,
	ArrowUp,
	Twitter,
	Instagram,
	Youtube,
	Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSubscribeToNotifications } from "@/hooks/use-notification-subscribers";
import { useSettings } from "@/hooks/use-settings";
import { Link } from "@/i18n/navigation";
import { z } from "zod";

const emailSchema = z.object({
	email: z.string().email("Invalid email address"),
});

export default function Footer() {
	const t = useTranslations("footer");
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState<string | null>(null);
	const { mutate: subscribeToNotifications, isPending } =
		useSubscribeToNotifications();
	const { data: settings } = useSettings();

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleNewsletterSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedEmail = email.trim();

		// Validate email with zod
		const result = emailSchema.safeParse({ email: trimmedEmail });

		if (!result.success) {
			setEmailError(t("invalidEmail"));
			return;
		}

		setEmailError(null);
		subscribeToNotifications(
			{ email: trimmedEmail },
			{
				onSuccess: () => {
					setEmail("");
					setEmailError(null);
				},
				onError: () => {
					setEmailError("Failed to subscribe. Please try again.");
				},
			}
		);
	};

	return (
		<footer className="w-full bg-very-dark-green border-t border-light-green/20">
			<div className="container mx-auto px-6 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
					{/* Newsletter Subscription */}
					<div className="bg-dark-green rounded-lg p-8">
						<h3 className="text-white text-lg font-semibold mb-6 whitespace-pre-line">
							{t("subscribe")}
						</h3>
						<form onSubmit={handleNewsletterSubmit} className="space-y-2">
							<div className="flex items-center gap-3 border-b border-white/20 pb-2">
								<Input
									type="email"
									placeholder={t("emailPlaceholder")}
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										if (emailError) setEmailError(null);
									}}
									disabled={isPending}
									className="flex-1 shadow-none bg-transparent border-none text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
								/>
								<Button
									type="submit"
									variant="ghost"
									size="icon"
									disabled={isPending}
									className="text-white hover:text-light-green hover:bg-transparent"
									aria-label={t("submitNewsletter")}
								>
									<ArrowRight className="w-5 h-5" />
								</Button>
							</div>
							{emailError && (
								<p className="text-sm text-red-400">{emailError}</p>
							)}
						</form>
						{/* Social Media Links */}
						{settings && (
							<div className="mt-6 flex items-center gap-4">
								{settings.twitterUrl && (
									<a
										href={settings.twitterUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-white/60 hover:text-light-green transition-colors"
									>
										<Twitter className="w-5 h-5" />
									</a>
								)}
								{settings.instagramUrl && (
									<a
										href={settings.instagramUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-white/60 hover:text-light-green transition-colors"
									>
										<Instagram className="w-5 h-5" />
									</a>
								)}
								{settings.youtubeUrl && (
									<a
										href={settings.youtubeUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-white/60 hover:text-light-green transition-colors"
									>
										<Youtube className="w-5 h-5" />
									</a>
								)}
								{settings.linkedinUrl && (
									<a
										href={settings.linkedinUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-white/60 hover:text-light-green transition-colors"
									>
										<Linkedin className="w-5 h-5" />
									</a>
								)}
							</div>
						)}
					</div>

					{/* Logo and Navigation */}
					<div className="flex flex-col">
						{/* Logo */}
						<h2 className="text-white text-3xl md:text-4xl text-center lg:text-left font-bold mb-4 tracking-wider">
							COLLBRAI
						</h2>

						{/* Footer Description */}
						{settings?.footerDescription && (
							<div
								className="text-white/70 text-xs mb-8 text-center lg:text-left"
								dangerouslySetInnerHTML={{ __html: settings.footerDescription }}
							/>
						)}

						{/* Links Grid */}
						<div className="grid grid-cols-3 gap-8">
							{/* INFO Column */}
							<div>
								<h3 className="text-light-green text-sm font-semibold uppercase mb-4">
									{t("info")}
								</h3>
								<ul className="space-y-3">
									<li>
										<Link
											href="/contact"
											className="text-white text-sm hover:text-light-green transition-colors"
										>
											{t("contactUs")}
										</Link>
									</li>
								</ul>
							</div>

							{/* ADDITIONAL LINK Column */}
							<div>
								<h3 className="text-light-green text-sm font-semibold uppercase mb-4">
									{t("additionalLink")}
								</h3>
								<ul className="space-y-3">
									{settings?.termsOfUse && (
										<li>
											<Link
												href="/legal/terms-of-use"
												className="text-white text-sm hover:text-light-green transition-colors"
											>
												{t("termsOfUse")}
											</Link>
										</li>
									)}
									{settings?.privacyPolicy && (
										<li>
											<Link
												href="/legal/privacy-policy"
												className="text-white text-sm hover:text-light-green transition-colors"
											>
												{t("privacyPolicy")}
											</Link>
										</li>
									)}
									{settings?.cookiePolicy && (
										<li>
											<Link
												href="/legal/cookie-policy"
												className="text-white text-sm hover:text-light-green transition-colors"
											>
												{t("cookiePolicy")}
											</Link>
										</li>
									)}
								</ul>
							</div>
							<div className="flex justify-center items-end">
								<Button
									onClick={scrollToTop}
									variant="ghost"
									size="icon"
									className="rounded-full border border-white/20 text-white hover:text-light-green hover:bg-very-dark-green size-16"
									aria-label={t("scrollToTop")}
								>
									<ArrowUp className="size-8!" />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
