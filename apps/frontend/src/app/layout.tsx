import { ThemeProvider } from "@/components/ui/theme-provider";
import "../components/styles/globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "@/components/query-provider";
import SplashAfterHydration from "@/components/ui/SplashAfterHydration";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Immersio",
  description: "Timeless Furniture in 3D Elegance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Providers>
            <SplashAfterHydration />
            {children}
            <Toaster richColors closeButton position="top-center" />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}