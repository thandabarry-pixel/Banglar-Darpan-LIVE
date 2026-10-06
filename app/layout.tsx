import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banglar Darpan LIVE",
  description: "Bangla live TV and streaming portal",
  metadataBase: new URL("http://localhost:3000")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
