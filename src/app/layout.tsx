import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noval | Game Designer & Multimedia Artist",
  description: "Portfolio of Ieong Hoi Long Noval - Game Design, Digital Art, and Creative Coding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased selection:bg-accent/20 selection:text-accent`}>
        {children}
      </body>
    </html>
  );
}