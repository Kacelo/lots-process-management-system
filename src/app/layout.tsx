import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RootStateProvider } from "./stores/RootStateContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { NavBar } from "@/components/ui/navbar/navbar";

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
  title: "Process Manager",
  description: "LOTS software development test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootStateProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>{" "}
        </RootStateProvider>
      </body>
    </html>
  );
}
