import { HomeLayout } from "@/components/layouts/HomeLayout";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: {
        default: "Encrypt | Crypto File",
        template: "%s | Crypto file",
    },
    description: "A website for encrypting and decrypting files.",
};

export interface LayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <Providers>
                    <HomeLayout>{children}</HomeLayout>
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
