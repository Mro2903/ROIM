/**
 * Tailwind CSS configuration file with UploadThing integration.
 * This configuration includes:
 * - Dark mode support using class strategy
 * - Content paths for scanning
 * - Custom theme extensions
 * - UploadThing plugin integration
 */

import { withUt } from "uploadthing/tw";

module.exports = withUt({
	/** Dark mode configuration using class strategy */
	darkMode: "class",
	/** Content paths for Tailwind to scan for classes */
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	/** Theme configuration with custom extensions */
	theme: {
		extend: {
			/** Custom color variables mapped to CSS variables */
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
	},
	/** Additional Tailwind plugins */
	plugins: [],
})

