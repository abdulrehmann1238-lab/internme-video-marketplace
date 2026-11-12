import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://internme.example"),
  title: {
    default: "InternMe — Curated Video-First Talent Marketplace",
    template: "%s | InternMe",
  },
  description:
    "Discover ambitious students and emerging makers through authentic 30-second video introductions. Built for startup internships and SignMeUp Sprints.",
  openGraph: {
    title: "InternMe — Where Potential Meets Opportunity",
    description:
      "Your next opportunity starts with a 30-second introduction. Explore internships and SignMeUp Sprints.",
    type: "website",
    siteName: "InternMe",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${dmSerif.variable}`}
    >
      <body className="font-sans antialiased bg-warm-ivory text-warm-charcoal">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

