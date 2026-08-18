"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { locales, localeNames, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";

export default function Header({ locale, dict }: { locale: Locale; dict: Dict }) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);

  const pathWithoutLocale = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    if ((locales as readonly string[]).includes(parts[0])) parts.shift();
    return "/" + parts.join("/");
  }, [pathname]);

  const nav = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/jobs`, label: dict.nav.jobs },
    { href: `/${locale}/workers`, label: dict.nav.workers },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-semibold text-brand-700">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">S</span>
          <span className="text-lg">{dict.brand}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ms-4">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`px-3 py-2 rounded-md text-sm ${
                  active ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 rounded-lg border border-slate-200 p-0.5">
            {locales.map((l) => {
              const target = `/${l}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
              const active = l === locale;
              return (
                <Link
                  key={l}
                  href={target}
                  className={`px-2.5 py-1 text-xs rounded-md ${
                    active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {l.toUpperCase()}
                </Link>
              );
            })}
          </div>

          <Link href={`/${locale}/post-job`} className="hidden md:inline-flex btn-primary text-sm py-2 px-3">
            {dict.cta.postJob}
          </Link>
          <button
            className="md:hidden rounded-lg border border-slate-200 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
          >
            <span className="block w-5 h-0.5 bg-slate-700 mb-1" />
            <span className="block w-5 h-0.5 bg-slate-700 mb-1" />
            <span className="block w-5 h-0.5 bg-slate-700" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-slate-700">
                {n.label}
              </Link>
            ))}
            <Link href={`/${locale}/post-job`} onClick={() => setOpen(false)} className="btn-primary text-sm py-2">
              {dict.cta.postJob}
            </Link>
            <Link href={`/${locale}/register-worker`} onClick={() => setOpen(false)} className="btn-secondary text-sm py-2">
              {dict.cta.becomeWorker}
            </Link>
            <div className="flex gap-2 pt-2">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`}
                  className={`px-3 py-1 text-sm rounded-md border ${
                    l === locale ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-700"
                  }`}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
