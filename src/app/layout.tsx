import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

import Provider from "../../util/Providers";
import { GlobalContextProvider } from "./context/TriviaContext";
import { titleClass } from "./styles/title-style";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trivia App",
  description: "Created by Damian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="min-h-screen flex justify-center bg-slate-800">
        <div className="w-4/5">
          <header className="w-full text-center p-4">
            <h1 className={titleClass}>
              Trivia App
            </h1>
          </header>
          <div className="w-full flex justify-center">
            <Provider>
              <GlobalContextProvider>{children}</GlobalContextProvider>
            </Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
