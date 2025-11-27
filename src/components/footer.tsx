"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, ArrowUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Footer() {
	const t = useTranslations("footer");
	const [email, setEmail] = useState("");

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
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
						<form
							onSubmit={(e) => {
								e.preventDefault();
								// Handle newsletter subscription
								console.log("Subscribe:", email);
							}}
							className="flex items-center gap-3 border-b border-white/20 pb-2"
						>
							<Input
								type="email"
								placeholder={t("emailPlaceholder")}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="flex-1 shadow-none bg-transparent border-none text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
							/>
							<Button
								type="submit"
								variant="ghost"
								size="icon"
								className="text-white hover:text-light-green hover:bg-transparent"
							>
								<ArrowRight className="w-5 h-5" />
							</Button>
						</form>
					</div>

					{/* Logo and Navigation */}
					<div className="flex flex-col">
						{/* Logo */}
						<h2 className="text-white text-2xl md:text-3xl lg:text-4xl text-center lg:text-left font-bold mb-4 tracking-wider">
							COLLBRAI
						</h2>

						{/* Navigation */}
						<div className="flex items-center gap-2 md:gap-4 lg:gap-6 text-white text-sm mb-8">
							<span>{t("forApplicants")}</span>
							<span className="text-white/50">/</span>
							<span>{t("forCustomer")}</span>
						</div>

						{/* Links Grid */}
						<div className="grid grid-cols-3 gap-8">
							{/* INFO Column */}
							<div>
								<h4 className="text-light-green text-sm font-semibold uppercase mb-4">
									{t("info")}
								</h4>
								<ul className="space-y-3">
									<li>
										<a
											href="#"
											className="text-white text-sm hover:text-light-green transition-colors"
										>
											{t("contactUs")}
										</a>
									</li>
									<li>
										<a
											href="#"
											className="text-white text-sm hover:text-light-green transition-colors"
										>
											{t("shippingInformation")}
										</a>
									</li>
									<li>
										<a
											href="#"
											className="text-white text-sm hover:text-light-green transition-colors flex items-center gap-1"
										>
											{t("faqs")}
											<ExternalLink className="w-3 h-3" />
										</a>
									</li>
								</ul>
							</div>

							{/* ADDITIONAL LINK Column */}
							<div>
								<h4 className="text-light-green text-sm font-semibold uppercase mb-4">
									{t("additionalLink")}
								</h4>
								<ul className="space-y-3">
									<li>
										<a
											href="#"
											className="text-white text-sm hover:text-light-green transition-colors"
										>
											{t("productCustomization")}
										</a>
									</li>
									<li>
										<a
											href="#"
											className="text-white text-sm hover:text-light-green transition-colors"
										>
											{t("community")}
										</a>
									</li>
									<li>
										<a
											href="#"
											className="text-white text-sm hover:text-light-green transition-colors"
										>
											{t("corporateResponsibility")}
										</a>
									</li>
								</ul>
							</div>
							<div className="flex justify-center items-end">
								<Button
									onClick={scrollToTop}
									variant="ghost"
									size="icon"
									className="rounded-full border border-white/20 text-white hover:text-light-green hover:bg-very-dark-green size-16"
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
