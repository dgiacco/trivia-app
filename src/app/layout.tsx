import type { Metadata } from "next";
import localFont from "next/font/local"

import "./globals.css";
import "../styles/animations.css"
import Provider from "../../util/Providers";
import { GlobalContextProvider } from "./context/TriviaContext";
import { titleClass } from "./styles/title-style";

const poetsenone = localFont({ src: "../font/PoetsenOne-Regular.ttf", variable: "--poetsen-one" });

export const metadata: Metadata = {
  title: "TriviangA",
  description: "Created by Damian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const bodyClass = `${poetsenone.variable} min-h-screen flex justify-center bg-slate-800`

  return (
    <html>
      <body className={bodyClass}>
        <div className="w-4/5">
          <header className="w-full text-center p-4">
            <h1 className={titleClass}>
              TriviangA
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
