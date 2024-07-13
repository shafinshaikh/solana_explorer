import "./globals.css";
import { Inter } from "next/font/google";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import { NetworkProvider } from "@/contexts/NetworkContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shafin's Solana Explorer",
  description: "A Solana Blockchain explorer that can be read comfortably",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <NetworkProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </NetworkProvider>
      </body>
    </html>
  );
}
