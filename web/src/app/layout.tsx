import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const plex = IBM_Plex_Sans_JP({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reflective AI",
  description:
    "判断やアドバイスをしない壁打ち。書いたことはここには保存されません。",
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
      <body className={plex.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
