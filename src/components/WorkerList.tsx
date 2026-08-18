"use client";

import { useEffect, useMemo, useState } from "react";
import { listWorkers, seedIfEmpty, subscribe } from "@/lib/store";
import type { Worker, CategoryKey } from "@/lib/types";
import { categoryKeys } from "@/lib/types";
import CategoryChip from "@/components/CategoryChip";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function WorkerList({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [category, setCategory] = useState<CategoryKey | "all">("all");
  const [city, setCity] = useState<string>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    seedIfEmpty();
    const load = () => setWorkers(listWorkers());
    load();
    return subscribe(load);
  }, []);

  const cities = useMemo(() => {
    const s = new Set<string>(dict.cities);
    workers.forEach((w) => s.add(w.city));
    return Array.from(s);
  }, [workers, dict.cities]);

  const filtered = useMemo(() => {
    return workers.filter((w) => {
      if (category !== "all" && !w.services.includes(category)) return false;
      if (city !== "all" && w.city !== city) return false;
      if (q && !`${w.name} ${w.about}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [workers, category, city, q]);

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
        <div className="card text-slate-500">{dict.workers.empty}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((w) => (
            <div key={w.id} className="card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900">{w.name}</h3>
                  <div className="text-sm text-slate-500 mt-0.5">📍 {w.city} · {w.languages}</div>
                </div>
                {w.hourlyRate != null && (
                  <div className="text-right">
                    <div className="text-brand-700 font-semibold">₪{w.hourlyRate}/h</div>
                    {w.experience != null && (
                      <div className="text-xs text-slate-500">{w.experience} {dict.workers.years}</div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {w.services.map((s) => (
                  <CategoryChip key={s} category={s} dict={dict} />
                ))}
              </div>
              <p className="text-slate-600 mt-3">{w.about}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a href={`tel:${w.contact}`} className="btn-secondary py-2 px-3 text-sm">
                  📞 {w.contact}
                </a>
                {w.email && (
                  <a href={`mailto:${w.email}`} className="text-brand-700 hover:underline self-center">
                    ✉ {w.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
