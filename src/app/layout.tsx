import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "EXCEL 4.0 - IT Festival",
  description:
    "EXCEL 4.0 is an exciting IT Festival that brings together technology enthusiasts, professionals, and students for workshops, talks, and competitions.",
  metadataBase: new URL("https://excel-4.vercel.app"),
  authors: [{ name: "Sooraj Rao", url: "https://soorajrao.in?ref=excel-seo" }],
  creator: "Sooraj Rao",
  publisher: "Sooraj Rao",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "EXCEL 4.0 - IT Festival",
    description:
      "Join us at EXCEL 4.0, an IT Festival that celebrates innovation, technology, and education.",
    url: "https://excel-4.vercel.app",
    siteName: "EXCEL 4.0",
    images: [
      {
        url: "https://excel-4.vercel.app/home.png",
        width: 1200,
        height: 630,
        alt: "EXCEL 4.0 IT Festival",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EXCEL 4.0 - IT Festival",
    description:
      "Join us at EXCEL 4.0, an IT Festival focused on technology and innovation.",
    creator: "@SoorajRaoo",
    images: ["https://excel-4.vercel.app/home.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  keywords: [
    "EXCEL 4.0",
    "IT Festival",
    "technology",
    "workshops",
    "competitions",
    "IT professionals",
    "students",
    "technology events",
  ],
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "EXCEL 4.0",
              url: "https://excel-4.vercel.app",
              description:
                "EXCEL 4.0 is an exciting IT Festival that brings together technology enthusiasts, professionals, and students for workshops, talks, and competitions.",
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.className} bg-black`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
