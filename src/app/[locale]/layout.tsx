import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locales, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!(locales as readonly string[]).includes(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);
  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict} />
    </div>
  );
}
