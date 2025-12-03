"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AlignJustify, X, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getPages } from "@/services/client/page-service";
import { Page } from "@/types/page.types";
import { MenuSkeleton } from "@/components/ui/skeleton";

export default function MenuButton() {
	const t = useTranslations();
	const [menuOpen, setMenuOpen] = useState(false);
	const [pages, setPages] = useState<Page[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const menuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const fetchPages = async () => {
			try {
				setIsLoading(true);
				const response = await getPages({
					page: 0,
					size: 15,
					sort: "createdAt,DESC",
				});
				// Ana sayfayı filtrele
				const filteredPages = (response.content || []).filter(
					(page) => page.type !== "Ana Sayfa"
				);
				setPages(filteredPages || []);
			} catch (error) {
				console.error("Failed to fetch pages:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchPages();
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && menuOpen) {
				setMenuOpen(false);
			}
		};
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [menuOpen]);

	return (
		<div className="relative" ref={menuRef}>
			<Button
				variant="ghost"
				onClick={() => setMenuOpen((prev) => !prev)}
				className="flex items-center gap-1 sm:gap-2 text-white hover:text-green-light transition-colors sm:px-4"
				aria-label={t("header.menuAriaLabel")}
				aria-expanded={menuOpen}
			>
				{menuOpen ? (
					<X className="w-5 h-5 text-green-light flex-shrink-0" />
				) : (
					<AlignJustify className="w-5 h-5 text-green-light flex-shrink-0" />
				)}
				<span className="font-sans text-sm sm:text-base hidden sm:inline">{t("header.menu")}</span>
			</Button>

			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="absolute left-0 mt-4 max-w-64 rounded-2xl border border-white/15 bg-black/35 p-4 shadow-2xl "
					>
						{isLoading ? (
							<MenuSkeleton />
						) : (
							<>
								<nav className="flex space-x-3 flex-wrap">
									{pages.map((page) => (
										<Link
											key={page.id}
											href={`/pages/${page.slug}`}
											className="rounded-lg px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
											onClick={() => setMenuOpen(false)}
										>
											{page.name}
										</Link>
									))}
								</nav>
								{/* Contact Link - Highlighted */}
								<div className="mt-4 pt-4 border-t border-white/10">
									<Link
										href="/contact"
										onClick={() => setMenuOpen(false)}
										className="flex items-center gap-2 rounded-xl bg-light-green/10 px-4 py-3 text-sm font-medium text-light-green hover:bg-light-green/20 transition-colors"
									>
										<Mail className="h-4 w-4" />
										{t("footer.contactUs")}
									</Link>
								</div>
							</>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
