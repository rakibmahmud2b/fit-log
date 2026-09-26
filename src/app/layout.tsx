import { Inter, Oswald } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FitLogProvider from "@/context/FitLogProvider";
import ToastProvider from "@/components/ui/ToastProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "FitLog | Workout Library",
  description: "Choose a lift, build your plan, and track your workout week.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <FitLogProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </FitLogProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
