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
			className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 lg:py-6 bg-black-almost/30 backdrop-blur-md border-b border-white/10"
		>
			<div className="flex justify-between items-center w-full max-w-7xl mx-auto">
				{/* Left Section - Navigation */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-shrink-0 min-w-0"
				>
					<MenuButton />
				</motion.div>

				{/* Center Section - Logo */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="flex flex-col items-center flex-shrink-0 mx-2 sm:mx-4"
				>
					<Link href="/" className="group relative inline-block" aria-label="Collbrai - Home">
						<motion.h1
							whileHover={{ scale: 1.08 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
							className="text-lg sm:text-xl md:text-2xl text-light-green tracking-wider cursor-pointer transition-all duration-300 relative z-10 group-hover:text-green-bright group-hover:[filter:drop-shadow(0_0_15px_rgba(0,168,107,0.8))_drop-shadow(0_0_30px_rgba(0,168,107,0.4))]"
						>
							COLLBRAI
						</motion.h1>
					</Link>
				</motion.div>

				{/* Right Section - Lang Switcher */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0"
				>
					<LangSwitcher />
				</motion.div>
			</div>
		</motion.header>
	);
}
