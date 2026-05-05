import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "VisitVagad — Tribal Culture, Rural Stays & Craft Marketplace",
  description:
    "Explore the rich tribal heritage of Vagad (Banswara & Dungarpur, Rajasthan). Book rural homestays, discover Bhil Bazaar crafts, and plan your AI-powered Vagad itinerary.",
  keywords: "Vagad, Banswara, Dungarpur, Rajasthan, tribal tourism, rural stays, Bhil Bazaar, Tripura Sundari",
  openGraph: {
    title: "VisitVagad — Tribal Culture, Rural Stays & Craft Marketplace",
    description: "Explore the rich tribal heritage of Vagad — AI-powered trip planning, authentic rural homestays & handcrafted tribal products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
