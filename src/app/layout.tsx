import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Thilagan M.S. | Freelance Full Stack Web Developer",
  description: "I build fast, modern, responsive, and scalable websites and web applications for startups, businesses, and creators. Expert React, Next.js, Node.js, and MongoDB development.",
  keywords: [
    "Freelance Full Stack Web Developer",
    "Freelance Web Developer",
    "React Developer",
    "Next.js Developer",
    "Web Application Developer",
    "Custom Website Development",
    "Thilagan M.S."
  ],
  authors: [{ name: "Thilagan M.S." }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
