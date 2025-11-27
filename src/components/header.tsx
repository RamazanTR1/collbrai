"use client";

import { motion } from "framer-motion";
import LangSwitcher from "@/components/lang-switcher";
import { Link } from "@/i18n/navigation";
import MenuButton from "@/components/menu-button";

export default function Header() {
	return (
		<motion.header
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="fixed top-0 left-0 right-0 z-50 w-full px-10 py-6 bg-black-almost/30 backdrop-blur-md border-b border-white/10"
		>
			<div className="flex justify-between items-center w-full">
				{/* Left Section - Navigation */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="flex items-center gap-8 flex-1"
				>
					<MenuButton />
				</motion.div>

				{/* Center Section - Logo */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="flex flex-col items-center flex-1"
				>
					<Link href="/">
						<h1 className="text-2xl text-light-green tracking-wider cursor-pointer hover:text-green-bright transition-colors">
							COLLBRAI
						</h1>
					</Link>
				</motion.div>

				{/* Right Section - Auth Buttons */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="flex items-center gap-3 flex-1 justify-end w-full"
				>
					<LangSwitcher />
				</motion.div>
			</div>
		</motion.header>
	);
}
