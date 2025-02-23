import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Luu tu Long | Project | Test",
  description: "Project by Luu Tu Long",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Image
          src="/chat-icon.png"
          alt="Chat Icon"
          width={24}
          height={24}
          className="fixed md:top-[83%] top-[90%] right-6 w-14 h-14 cursor-pointer z-20"
        />
        <Footer />
      </body>
    </html>
  );
}
