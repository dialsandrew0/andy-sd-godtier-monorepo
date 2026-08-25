import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "ArtPeriod — Art Intelligence",
  description: "Discover, track, and collect fine art with intelligence.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
