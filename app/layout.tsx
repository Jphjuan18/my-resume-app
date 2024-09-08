import type { Metadata } from "next";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
          <Header />
          <main className="flex-grow">{children}</main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
