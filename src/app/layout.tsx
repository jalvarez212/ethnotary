import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/SideBar";
import { Providers } from "./context/providers";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-clay-primary">
            <div className="flex">
              <div className="w-[80px] fixed left-0 top-0 min-h-full">
                <Sidebar />
              </div>
              <div className="flex-1 ml-[80px]">
                <div className="max-w-screen-2xl mx-auto px-4">
                  <div className="mt-3">
                    <Header />
                    <main className="p-6">{children}</main>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
