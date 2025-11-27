import { defineRouting } from "next-intl/routing";

const pathnames: Record<string, string | Record<string, string>> = {
	"/": {
		tr: "/",
		en: "/",
	},
};

export const routing = defineRouting({
	locales: ["en", "tr"],
	defaultLocale: "tr",
	localePrefix: "always",
	pathnames,
});
