import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components";
import { PersistentEarthCanvas } from "./components/PersistentEarthCanvas";
import { EarthReadyProvider } from "./components/EarthReadyProvider";
import { ContentWrapper } from "./components/ContentWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeoPulse",
  description: "NeoPulse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EarthReadyProvider>
          <PersistentEarthCanvas />
          <ContentWrapper>
            <Navbar />
            {children}
          </ContentWrapper>
        </EarthReadyProvider>
      </body>
    </html>
  );
}
