import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Little World",
  description: "a tiny world made just for you mera baccha 💗",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}