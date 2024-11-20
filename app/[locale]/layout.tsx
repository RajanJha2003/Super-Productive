import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";



const locales = ["en", "te"];

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  const messages=await getMessages();
  return (
    <html  lang={locale} suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
       <NextIntlClientProvider locale={locale} messages={messages} >
       <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange >
        {children}
        </ThemeProvider>
       </NextIntlClientProvider>
      </body>
    </html>
  );
}
