import type { Metadata } from "next";
import { Outfit, Ubuntu_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import RouteOverlay from "@/components/RouteOverlay";
import { TransitionProvider } from "@/components/TransitionProvider";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ubuntuSans = Ubuntu_Sans({
  variable: "--font-ubuntu-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Mubashir Portfolio",
  description: "Portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${ubuntuSans.variable} h-full antialiased`}
    >
      <body className="outfit-regular">
        <TransitionProvider>
          <SmoothScrollProvider>
            <RouteOverlay />
            {children}
            <Navbar/>
          </SmoothScrollProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}