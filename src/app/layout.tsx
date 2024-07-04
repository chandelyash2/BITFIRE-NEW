import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "@/client/apollo";
import { CMSContext } from "@/context";
import FavIcon from "../../public/favicon.ico";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bit Fire",
  description: "Bit Fire",
  icons: [
    {
      rel: "icon",
      url: FavIcon.src,
      sizes: "180x180",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <Provider>
            <CMSContext>{children}</CMSContext>
          </Provider>
        </ChakraProvider>
      </body>
    </html>
  );
}
