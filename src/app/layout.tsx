import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "RetroSpific - 3D Design Tool",
  description: "Create and manipulate 3D shapes in your browser with RetroSpific",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-3 flex items-center gap-3">
            <div className="flex items-center hover:opacity-90 transition-opacity">
              <Image
                src="/assets/logo.png"
                alt="RetroSpific Logo"
                width={36}
                height={36}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              RetroSpific
            </h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
