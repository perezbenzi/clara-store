import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { CartProvider } from "@/context/CartContext";
import NavigationLoader from "@/components/ui/NavigationLoader";
import ScrollToTop from "@/components/ui/ScrollToTop";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Clara's Bakehouse — Premium Cakes Sydney",
    template: "%s | Clara's Bakehouse",
  },
  description:
    "Sydney's finest premium cake bakery. Handcrafted cakes made fresh every day in Manly, Chatswood & Broadway.",
  keywords: ["bakery", "cakes", "Sydney", "premium", "fresh"],
  openGraph: {
    siteName: "Clara's Bakehouse",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink font-body">
        <CartProvider>
          <NavigationLoader />
          <ScrollToTop />
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
