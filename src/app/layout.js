// app/layout.js

import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/provider/QueryProvider";
import AuthProvider from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Raipurian Club - Premium Community Platform",
    template: "%s | Raipurian Club",
  },
  description:
    "Join the Raipurian Club community platform for members, events, donations, and projects. Lifetime premium membership with exclusive benefits, networking opportunities, and community events.",

  // Keywords for SEO
  keywords: [
    "Raipurian Club",
    "Community Club",
    "Premium Membership",
    "Networking",
    "Community Events",
    "Raipur",
    "Club Membership",
    "Community Platform",
    "Social Club",
    "Professional Networking",
  ],

  // Author and creator
  authors: [{ name: "Raipurian Club", url: "https://raipurianclub.com" }],
  creator: "Raipurian Club",
  publisher: "Raipurian Club",

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    title: "Raipurian Club - Premium Community Platform",
    description:
      "Join the Raipurian Club community with lifetime premium membership. Access exclusive events, networking opportunities, and community benefits.",
    url: "https://raipurianclub.com",
    siteName: "Raipurian Club",
    images: [
      {
        url: "https://raipurianclub.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Raipurian Club - Community Hub",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Raipurian Club - Premium Community Platform",
    description:
      "Join the Raipurian Club community with lifetime premium membership. Access exclusive events, networking opportunities, and community benefits.",
    images: ["https://raipurianclub.com/twitter-image.jpg"],
    creator: "@raipurianclub",
    site: "@raipurianclub",
  },

  // Additional SEO
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

  // Canonical URL
  alternates: {
    canonical: "https://raipurianclub.com",
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },

  // App manifest
  manifest: "/manifest.json",

  // Viewport settings (moved to separate export as per Next.js 14+)
  // Verification codes for search consoles
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // Category and classification
  category: "Community",
  classification: "Social Networking",

  // Other metadata
  applicationName: "Raipurian Club",
  appleWebApp: {
    capable: true,
    title: "Raipurian Club",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
    url: true,
  },
  referrer: "origin-when-cross-origin",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

// Separate viewport export for Next.js 14+
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
