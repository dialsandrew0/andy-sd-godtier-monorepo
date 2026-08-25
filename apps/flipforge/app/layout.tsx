import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "FlipForge — Field & Resale Intelligence",
  description: "Photo-to-verdict triage, authenticity tells, value ranges, listing generation.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
