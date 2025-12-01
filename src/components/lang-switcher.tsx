"use client";

import React from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LangSwitcher() {
	const router = useRouter();
	const pathname = usePathname();
	const currentLocale = useLocale();

	const locales = [...routing.locales] as ("en" | "tr")[];
	const localeLabels: Record<"en" | "tr", string> = {
		en: "EN",
		tr: "TR",
	};

	const switchLocale = (locale: string) => {
		router.replace(pathname, { locale });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex items-center gap-1 text-white hover:text-green-light transition-colors font-sans px-2 sm:px-3 md:px-4 py-2 h-auto text-sm sm:text-base"
				>
					<span className="min-w-[2rem] text-center">{localeLabels[currentLocale as "en" | "tr"]}</span>
					<ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="center"
				className="bg-very-dark-green border-white/20 min-w-18"
			>
				{locales.map((locale) => (
					<DropdownMenuItem
						key={locale}
						onClick={() => switchLocale(locale)}
						className={`text-white hover:bg-light-green/14 hover:text-green-light focus:bg-light-green/14 focus:text-green-light cursor-pointer ${
							currentLocale === locale
								? "bg-green-light/10 text-green-light"
								: ""
						}`}
					>
						{localeLabels[locale]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
