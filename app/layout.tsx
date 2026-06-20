import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Weg-Mitte",
  description: "Persönliche Website von Florian Mittel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-white text-gray-900 font-sans">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
