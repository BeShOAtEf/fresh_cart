import type { Metadata } from "next";

import "./globals.css";
import { Encode_Sans_Expanded, Geist } from "next/font/google";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { cn } from "@/lib/utils";
import '@fortawesome/fontawesome-free/css/all.min.css'
import NextAuthProvider from "@/Providers/Components/nextauth.providers";
import Providers from "@/Providers/Components/ReactQueryProvider.Provider";
  import { ToastContainer } from 'react-toastify';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const EnCode = Encode_Sans_Expanded({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart - your online grocery store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} >
      <body className={`${EnCode.className} antialiased`}suppressHydrationWarning>
        <Providers>
          <ToastContainer></ToastContainer>
        <div className="min-h-screen flex flex-col justify-between ">
          <NextAuthProvider>

          <Navbar />
          <div className="container">{children}</div>
          <Footer />
          </NextAuthProvider>
        </div>
        </Providers>
      </body>
    </html>
  );
}
