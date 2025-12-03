import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { generateMetadata as genMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/structured-data";
import { SkipLink } from "@/components/skip-link";
import { ErrorBoundary } from "@/components/error-boundary";

export function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	return Promise.resolve(params).then(({ locale }) =>
		genMetadata({
			title: "Collbrai - Scale With Smart AI Systems",
			locale: locale,
			path: "",
		})
	);
}

interface RootLayoutProps {
	children: React.ReactNode;
	params: Promise<{
		locale: string;
	}>;
}

export default async function LocaleLayout({
	children,
	params,
}: Readonly<RootLayoutProps>) {
	const locale = (await params).locale;

	if (!routing.locales.includes(locale as "tr" | "en")) {
		notFound();
	}

	setRequestLocale(locale);
	const messages = await getMessages({ locale });

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<ErrorBoundary>
				<SkipLink />
				<StructuredData type="Organization" locale={locale} />
				<Header />
				{children}
				<Footer />
			</ErrorBoundary>
		</NextIntlClientProvider>
	);
}
