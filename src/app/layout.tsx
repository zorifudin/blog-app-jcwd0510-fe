import Navbar from "@/components/Navbar";
import NextAuthProvider from "@/providers/NextAuthProvider";
import NuqsProvider from "@/providers/NuqsProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import StoreProvider from "@/providers/StoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <NuqsProvider>
              <StoreProvider>
                {/* <AuthProvider> ini digunakan jika tidak menggunakan nextauth.js */}
                {/* <TokenProvider> */}
                <ReactQueryProvider>
                  <Navbar />
                  {children}
                </ReactQueryProvider>
                <ToastContainer />
                {/* </TokenProvider> */}
                {/* </AuthProvider> */}
              </StoreProvider>
            </NuqsProvider>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
