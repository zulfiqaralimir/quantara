import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Quantara",
    template: "%s | Quantara",
  },
  description:
    "Signals Beyond the Noise. Financial analysis, data insights, and visual intelligence.",
  metadataBase: new URL("https://quantara-nine.vercel.app"),
  openGraph: {
    title: "Quantara",
    description:
      "Signals Beyond the Noise. Financial analysis, data insights, and visual intelligence.",
    url: "https://quantara-nine.vercel.app",
    siteName: "Quantara",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Navbar */}
        <header className="w-full border-b border-black/10">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <span className="text-xl font-semibold text-navy">
              Quantara
            </span>

            <div className="flex gap-6 text-sm font-medium">
              <a href="/analysis" className="hover:text-teal">
                Analysis
              </a>
              <a href="/visuals" className="hover:text-teal">
                Visuals
              </a>
              <a href="/research" className="hover:text-teal">
                Research
              </a>
            </div>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
