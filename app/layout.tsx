import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/font";

export const metadata: Metadata = {
  title: "Nextjs-dashboard",
  description: "The main dashboard",
  icons: {
    icon: "/hero-desktop.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
