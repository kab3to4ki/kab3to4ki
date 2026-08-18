"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { listJobs, seedIfEmpty, subscribe } from "@/lib/store";
import type { Job, CategoryKey } from "@/lib/types";
import { categoryKeys } from "@/lib/types";
import CategoryChip from "@/components/CategoryChip";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  dict: Dict;
  initialCategory?: CategoryKey | "all";
};

export default function JobList({ locale, dict, initialCategory = "all" }: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [category, setCategory] = useState<CategoryKey | "all">(initialCategory);
  const [city, setCity] = useState<string>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    seedIfEmpty();
    const load = () => setJobs(listJobs());
    load();
    return subscribe(load);
  }, []);

  const cities = useMemo(() => {
    const s = new Set<string>(dict.cities);
    jobs.forEach((j) => s.add(j.city));
    return Array.from(s);
  }, [jobs, dict.cities]);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (category !== "all" && j.category !== category) return false;
      if (city !== "all" && j.city !== city) return false;
      if (q && !`${j.title} ${j.description}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [jobs, category, city, q]);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-3 mb-6">
        <select className="select" value={category} onChange={(e) => setCategory(e.target.value as CategoryKey | "all")}>
          <option value="all">{dict.filters.all}</option>
          {categoryKeys.map((k) => (
            <option key={k} value={k}>
              {dict.category[k]}
            </option>
          ))}
        </select>
        <select className="select" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="all">{dict.filters.allCities}</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          className="input"
          placeholder={dict.filters.search}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="card text-slate-500">{dict.jobs.empty}</div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((j) => (
            <Link key={j.id} href={`/${locale}/jobs/${j.id}`} className="card hover:border-brand-400 hover:shadow-md transition block">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <CategoryChip category={j.category} dict={dict} />
                    <span className="chip bg-slate-100 text-slate-700">📍 {j.city}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900">{j.title}</h3>
                  <p className="text-slate-600 mt-1 line-clamp-2">{j.description}</p>
                </div>
                <div className="text-right shrink-0">
                  {j.budget != null && (
                    <div className="text-brand-700 font-semibold">₪{j.budget}</div>
                  )}
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(j.createdAt).toLocaleDateString(locale)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
