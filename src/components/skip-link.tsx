"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
	const t = useTranslations();

	return (
		<a
			href="#main-content"
			className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-light-green focus:text-black focus:rounded-md focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2 focus:ring-offset-black-almost"
		>
			Skip to main content
		</a>
	);
}

