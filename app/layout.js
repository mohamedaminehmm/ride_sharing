import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ride Sharing",
  description: "Share Riding with other people",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Login & Sign Up</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

