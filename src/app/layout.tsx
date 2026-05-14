import type { Metadata } from "next";
import { Nunito, Baloo_2, Comic_Neue } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ 
  subsets: ["latin", "vietnamese"], 
  variable: "--font-body",
  weight: ["400", "700", "900"]
});

const baloo = Baloo_2({ 
  subsets: ["latin", "vietnamese"], 
  variable: "--font-display",
  weight: ["400", "600", "800"]
});

const comic = Comic_Neue({ 
  subsets: ["latin"], 
  variable: "--font-comic",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Bí Ẩn Của Muối Ăn — Interactive Web Comic",
  description: "Khám phá hành trình kỳ diệu của NaCl qua truyện tranh tương tác, hoạt hình điện ảnh và trò chơi giáo dục",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${nunito.variable} ${baloo.variable} ${comic.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
