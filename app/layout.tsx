import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ABSOLUTE_CONFIG } from "@/lib/mock-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCallBar } from "@/components/mobile-call-bar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: ABSOLUTE_CONFIG.businessName,
    description: `Trusted ${ABSOLUTE_CONFIG.niche} services in ${ABSOLUTE_CONFIG.city}, ${ABSOLUTE_CONFIG.state}.`,
};

export default function AbsoluteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
            >
                <SiteHeader config={ABSOLUTE_CONFIG} />
                <main className="flex-1">
                    {children}
                </main>
                <SiteFooter config={ABSOLUTE_CONFIG} />
                <MobileCallBar config={ABSOLUTE_CONFIG} />
            </body>
        </html>
    );
}
