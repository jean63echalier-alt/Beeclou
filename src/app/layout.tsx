import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beeclou - Transforme tes déplacements en revenus",
  description: "Mobilité douce gamifiée avec économie locale communautaire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-bee-bg text-bee-text antialiased">
        {children}
      </body>
    </html>
  );
}
