import { ReactNode } from "react";
import { PAGE_TYPES, PageType, isValidPageType } from "@/constants/page-types";

interface PageLayoutProps {
	pageType: PageType | string | null;
	children: ReactNode;
}

export function PageLayout({ pageType, children }: PageLayoutProps) {
	// Determine if this is a valid fixed page type
	const isValidType = pageType && isValidPageType(pageType);

	// Get layout classes based on page type
	const getLayoutClasses = (): string => {
		if (!isValidType) {
			// Default spacing for dynamic pages or unknown types
			return "container mx-auto px-6 py-12";
		}

		switch (pageType) {
			case PAGE_TYPES.HOMEPAGE:
				// Homepage specific spacing
				return "container mx-auto px-6";
			// Future: Add other page types here
			// case PAGE_TYPES.ABOUT:
			//   return "container mx-auto px-8 py-16";
			default:
				// Default spacing for other fixed types
				return "container mx-auto px-6 py-36 lg:py-12";
		}
	};

	return <div className={getLayoutClasses()}>{children}</div>;
}
