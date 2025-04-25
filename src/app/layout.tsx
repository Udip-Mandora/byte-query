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
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SiteNavbar } from "@/components/ui/site-navbar";

export const metadata: Metadata = {
  title: "Byte Query",
  description: "New age coding query platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = await session?.user;
  return (
    <html lang="en">
      <body
        className={`min-h-sreen ${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {/* <SiteHeader user={user} /> */}
        <main className="">
          <SiteNavbar user={user}/>
          {children}
        </main>
      </body>
    </html>
  );
}
