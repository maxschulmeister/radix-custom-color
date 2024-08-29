import { Providers } from "@/components/providers";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Color Palette Creator",
  description: "Create a custom color palette with Radix Colors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-1 text-gray-12 dark:bg-grayDark-1 dark:text-grayDark-12`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
