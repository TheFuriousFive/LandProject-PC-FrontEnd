import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Intellinget Land Investment System",
  description: "The best platform for find the land for your investment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
