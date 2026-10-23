import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "AeroMESH | Distributed LLM Inference Engine",
  description:
    "AeroMESH enables distributed, fault-tolerant LLM inference across the hardware you already own. No model transfer. Just pure compute, working together.",
  keywords: [
    "distributed inference",
    "LLM",
    "AI cluster",
    "fault-tolerant",
    "mesh computing",
    "GPU cluster",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060B14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="bg-[#060B14] text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
