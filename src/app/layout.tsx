import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LYONEX | Premium Sports Nutrition",
    template: "%s | LYONEX"
  },
  description:
    "LYONEX black-and-gold sports nutrition store with COD-only checkout, authentic products, and performance-focused essentials."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
