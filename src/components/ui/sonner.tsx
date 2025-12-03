"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			toastOptions={{
				classNames: {
					toast:
						"!bg-[#172719] !text-white !border-[#91ffae]/20 shadow-lg backdrop-blur-md rounded-xl",
					description: "!text-white/70",
					actionButton: "!bg-[#91ffae] !text-[#0e0f0e] hover:!bg-[#91ffae]/90",
					cancelButton: "!bg-[#31422d] !text-white/70 hover:!bg-[#31422d]/80",
					success: "!border-[#91ffae]/40 !bg-[#172719]",
					error: "!border-red-500/40 !bg-[#172719]",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
