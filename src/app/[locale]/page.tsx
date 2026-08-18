import Link from "next/link";
import { getDict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { categoryKeys } from "@/lib/types";
import { categoryIcons } from "@/components/CategoryChip";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = getDict(params.locale);
  const locale = params.locale;

  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-transparent">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-wide text-brand-700 bg-brand-100 rounded-full px-3 py-1 mb-4">
              {dict.tagline}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              {dict.hero.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{dict.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/post-job`} className="btn-primary">
                {dict.cta.postJob}
              </Link>
              <Link href={`/${locale}/register-worker`} className="btn-secondary">
                {dict.cta.becomeWorker}
              </Link>
              <Link href={`/${locale}/jobs`} className="inline-flex items-center text-brand-700 hover:underline px-2 py-3">
                {dict.cta.browseJobs} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">{dict.categoriesTitle}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categoryKeys.map((key) => (
            <Link
              key={key}
              href={`/${locale}/jobs?category=${key}`}
              className="card hover:shadow-md hover:border-brand-300 transition flex items-center gap-3"
            >
              <span className="text-2xl">{categoryIcons[key]}</span>
              <span className="font-medium text-slate-800">{dict.category[key]}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="rounded-2xl border border-sand-200 bg-sand-50 text-sand-500 p-5 text-sm">
          <span className="font-semibold text-sand-500">✉ 📱 </span>
          <span className="text-slate-700">{dict.notifyBanner}</span>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold mb-2">{dict.cta.findWorker}</h3>
          <p className="text-slate-600 mb-4">{dict.hero.subtitle}</p>
          <Link href={`/${locale}/workers`} className="btn-secondary text-sm">
            {dict.form.seeWorkers}
          </Link>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold mb-2">{dict.cta.becomeWorker}</h3>
          <p className="text-slate-600 mb-4">{dict.hero.subtitle}</p>
          <Link href={`/${locale}/register-worker`} className="btn-primary text-sm">
            {dict.cta.becomeWorker}
          </Link>
        </div>
      </section>
    </div>
  );
}
