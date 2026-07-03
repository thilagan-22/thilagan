import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Thilagan M.S. | Embedded Systems Developer • Web Developer • PCB Designer",
  description: "Electrical & Electronics Engineering student with a multidisciplinary skill set spanning full-stack web development, embedded systems, and PCB design. Custom hardware and software solutions.",
  keywords: [
    "Embedded Systems Developer",
    "PCB Designer",
    "Web Developer",
    "Electrical Engineer",
    "Altium Designer",
    "KiCad",
    "React Developer",
    "Next.js Developer",
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
      <body className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
