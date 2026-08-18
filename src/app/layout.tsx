import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { defaultLocale, isRtl, locales, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Sababa Service — Marketplace for service workers in Israel",
  description:
    "Post a job or register as a service worker in Israel. Cleaners, handymen, movers, construction, gardening and more.",
};

function localeFromHeaders(): Locale {
  const path = headers().get("x-pathname") ?? "";
  const seg = path.split("/").filter(Boolean)[0];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = localeFromHeaders();
  return (
    <html lang={locale} dir={isRtl(locale) ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}
