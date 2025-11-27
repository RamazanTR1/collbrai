import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				white: {
					DEFAULT: "var(--color-white)",
				},
				green: {
					light: "var(--color-light-green)",
					light14: "var(--color-light-green-14)",
					dark: "var(--color-dark-green)",
					dark17: "var(--color-dark-green-17)",
					veryDark: "var(--color-very-dark-green)",
					veryDark30: "var(--color-very-dark-green-30)",
					bright: "var(--color-bright-green)",
					medium: "var(--color-medium-green)",
				},
				gray: {
					light: "var(--color-light-gray)",
					medium: "var(--color-medium-gray)",
					veryDark: "var(--color-very-dark-gray)",
				},
				orange: "var(--color-orange)",
				black: {
					almost: "var(--color-almost-black)",
				},
			},
			fontFamily: {
				sans: ["var(--font-poppins)", "sans-serif"],
				rethink: ["var(--font-rethink-sans)", "sans-serif"],
			},
		},
	},
	plugins: [],
};

export default config;
