import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";

import SidebarWrapper from "@/components/Sidebar/sidebar";
import BottomNavbar from "@/components/BottomNavbar";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
				style={{
					backgroundImage: `url("/assets/banners/bus.jpg")`,
					backgroundColor: "green",
					backgroundRepeat: "repeat",
					backgroundSize: "cover",
				}}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<SidebarWrapper />

					<div className="relative flex flex-col h-screen">
						<Navbar />
						<main className="container mx-auto max-w-7xl pt-0 px-6 flex-grow">
							{children}
						</main>
						<footer className="w-full flex items-center justify-center">
							{/* <p className="text-xs text-center text-gray-600">
								Copyright © {new Date().getFullYear()} Shotti Bookings - All rights reserved
							</p> */}
							<BottomNavbar className="flex w-full hide-on-desktop" />
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
