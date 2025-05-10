import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Changed from Geist_Sans
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ // Changed from Geist_Sans to Inter
  variable: '--font-sans', // Changed variable name from --font-geist-sans
  subsets: ['latin'],
});

// Geist_Mono might not be needed if not explicitly used, but keeping for consistency for now.
// const geistMono = Geist_Mono({ 
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Labyrinth Explorer',
  description: 'Navigate the Labyrinth of La Llorona',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
