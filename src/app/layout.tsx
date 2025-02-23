import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/ui/site-header";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Byte Query",
  description: "New age coding query platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  const isUserAuthenticated = await isAuthenticated();
  return (
    <html lang="en">
      <body
        className={`min-h-sreen ${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <SiteHeader isAuthenticated={isUserAuthenticated} user={user} />
        {children}
      </body>
    </html>
  );
}
