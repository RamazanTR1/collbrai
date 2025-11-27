import { ReactNode } from "react";
import { Poppins, Rethink_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	variable: "--font-poppins",
  subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

const rethinkSans = Rethink_Sans({
	variable: "--font-rethink-sans",
  subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
				className={`${poppins.variable} ${rethinkSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
