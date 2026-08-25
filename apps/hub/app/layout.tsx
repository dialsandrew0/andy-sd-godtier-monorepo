import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andy SD — God-Tier Product Hub",
  description: "ArtPeriod · BidLot · FlipForge · GigDesk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
