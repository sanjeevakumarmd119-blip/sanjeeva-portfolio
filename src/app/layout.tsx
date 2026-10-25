import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanjeeva Kumar MD | Full-Stack Developer & Video Editor",
  description:
    "Explore the portfolio of Sanjeeva Kumar MD, a full-stack developer and video editor based in Bengaluru, showcasing software projects, healthcare technology, IoT experiments, and creative skills.",
  authors: [{ name: "Sanjeeva Kumar MD", url: "https://github.com/sanjeevakumarmd119-blip" }],
  creator: "Sanjeeva Kumar MD",
  keywords: [
    "Sanjeeva Kumar MD",
    "Full-Stack Developer",
    "Video Editor",
    "Bengaluru",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "UCHN",
    "Healthcare Platform",
    "IoT",
    "ESP32",
    "Arduino",
    "DaVinci Resolve",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Sanjeeva Kumar MD | Full-Stack Developer & Video Editor",
    description:
      "Explore the portfolio of Sanjeeva Kumar MD, a full-stack developer and video editor based in Bengaluru, showcasing software projects, healthcare technology, IoT experiments, and creative skills.",
    siteName: "Sanjeeva Kumar MD Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanjeeva Kumar MD | Full-Stack Developer & Video Editor",
    description:
      "Explore the portfolio of Sanjeeva Kumar MD, a full-stack developer and video editor based in Bengaluru, showcasing software projects, healthcare technology, IoT experiments, and creative skills.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-[#FAFAFA] text-[#171717] antialiased selection:bg-[#FFF0EE] selection:text-[#F04444]">
        {children}
      </body>
    </html>
  );
}
