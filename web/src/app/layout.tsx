import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_JP } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans_JP({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reflective AI",
  description: "話す前に、少し書く。答えを与えない壁打ちのためのプロトタイプ。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={plex.className}>{children}</body>
    </html>
  );
}
