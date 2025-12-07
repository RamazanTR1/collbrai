import { ReactNode } from "react";
import type { Metadata } from "next";
import { Poppins, Rethink_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const poppins = Poppins({
	variable: "--font-poppins",
  subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
});

const rethinkSans = Rethink_Sans({
	variable: "--font-rethink-sans",
  subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	display: "swap",
});

export const metadata: Metadata = {
	manifest: "/manifest.json",
	themeColor: "#00A86B",
	icons: {
		icon: [
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
				className={`${poppins.variable} ${rethinkSans.variable} antialiased`}
      >
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
