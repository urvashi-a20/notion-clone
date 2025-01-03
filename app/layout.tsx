
import { Inter} from 'next/font/google';
import{Toaster} from "sonner";
import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { EdgeStoreProvider } from '@/lib/edgestore';


import { ThemeProvider } from "@/components/providers/theme-providers";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from '@/components/providers/modal-provider';

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

const inter =Inter({ subsets: ['latin']})

export const metadata: Metadata = {
  title: "Motion",
  description: "the connected workspace where better, faster work happens",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light )",
        url: "/logo.png",
        href: "/logo.png",
      },
      {
        media: "(prefers-color-scheme: dark )",
        url: "/logo.png",
        href: "/logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <EdgeStoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="Motion-theme-2"
          >
            <Toaster position="bottom-center" />
            <ModalProvider/>
            {children}
          </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
