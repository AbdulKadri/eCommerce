import Navbar from "@/components/Navbar";
import "../globals.css";
import Footer from "@/components/Footer";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "eCommerce",
  description: "Generated by Next + Sanity + Tailwindcss + Stripe + Vercel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="layout">
        <StateContext>
          <Toaster />
          <header>
            <Navbar />
          </header>
          <main className="main-container">{children}</main>
          <footer>
            <Footer />
          </footer>
        </StateContext>
      </body>
    </html>
  );
}
