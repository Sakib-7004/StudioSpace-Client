import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import AuthSync from "@/components/AuthSync";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  title: "StudioSpace | Find your creative space",
  description: "Discover and book inspiring creative studios, production spaces and workshops."
};

export default function RootLayout({ children }) {
  return <html lang="en" suppressHydrationWarning><body>
    <ThemeProvider><ToastProvider/><AuthSync/><Navbar/><main>{children}</main><Footer/></ThemeProvider>
  </body></html>;
}
