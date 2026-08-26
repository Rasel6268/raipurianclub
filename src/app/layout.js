// app/layout.js
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/provider/QueryProvider";
import AuthProvider from "@/context/AuthContext";
import FloatingCTA from "@/components/FloatingCTA"; // Import the widget

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Raipurian Club - Premium Community Platform",
    template: "%s | Raipurian Club",
  },
  description:
    "Join the Raipurian Club community platform for members, events, donations, and projects. Lifetime premium membership with exclusive benefits, networking opportunities, and community events.",

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

  authors: [{ name: "Raipurian Club", url: "https://raipurianclub.com" }],
  creator: "Raipurian Club",
  publisher: "Raipurian Club",

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

  twitter: {
    card: "summary_large_image",
    title: "Raipurian Club - Premium Community Platform",
    description:
      "Join the Raipurian Club community with lifetime premium membership. Access exclusive events, networking opportunities, and community benefits.",
    images: ["https://raipurianclub.com/twitter-image.jpg"],
    creator: "@raipurianclub",
    site: "@raipurianclub",
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

  alternates: {
    canonical: "https://raipurianclub.com",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },

  manifest: "/manifest.json",

  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },

  category: "Community",
  classification: "Social Networking",

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
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden min-h-screen selection:bg-emerald-500 selection:text-white`}>
        <AuthProvider>
          <Providers>
            {children}
            <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
            <FloatingCTA />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}