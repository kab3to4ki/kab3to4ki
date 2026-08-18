"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { addWorker } from "@/lib/store";
import { categoryKeys, type CategoryKey } from "@/lib/types";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function RegisterWorkerForm({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [form, setForm] = useState({
    name: "",
    services: [] as CategoryKey[],
    city: String(dict.cities[0]),
    hourlyRate: "",
    experience: "",
    about: "",
    languages: "",
    contact: "",
    email: "",
  });
  const [ok, setOk] = useState(false);

  const canSubmit = useMemo(
    () =>
      form.name.trim() && form.services.length > 0 && form.city && form.contact.trim() && form.about.trim(),
    [form]
  );

  function toggleService(k: CategoryKey) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(k) ? f.services.filter((s) => s !== k) : [...f.services, k],
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    addWorker({
      name: form.name.trim(),
      services: form.services,
      city: form.city,
      hourlyRate: form.hourlyRate ? Number(form.hourlyRate) : null,
      experience: form.experience ? Number(form.experience) : null,
      about: form.about.trim(),
      languages: form.languages.trim(),
      contact: form.contact.trim(),
      email: form.email.trim(),
    });
    setOk(true);
    setForm({ ...form, name: "", services: [], hourlyRate: "", experience: "", about: "", contact: "", email: "" });
  }

  return (
    <form onSubmit={submit} className="card grid gap-4">
      {ok && (
        <div className="rounded-lg bg-brand-50 border border-brand-200 text-brand-800 px-3 py-2 text-sm flex items-center justify-between gap-3">
          <span>{dict.form.successWorker}</span>
          <Link href={`/${locale}/workers`} className="underline">
            {dict.form.seeWorkers} →
          </Link>
        </div>
      )}
      <div>
        <label className="label">{dict.form.fieldName} *</label>
        <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      </div>
      <div>
        <label className="label">{dict.form.fieldServices} *</label>
        <div className="flex flex-wrap gap-2">
          {categoryKeys.map((k) => {
            const active = form.services.includes(k);
            return (
              <button
                type="button"
                key={k}
                onClick={() => toggleService(k)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  active
                    ? "bg-brand-600 border-brand-600 text-white"
                    : "bg-white border-slate-300 text-slate-700 hover:border-brand-400"
                }`}
              >
                {dict.category[k]}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">{dict.form.fieldCity} *</label>
          <select className="select" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
            {dict.cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">{dict.form.fieldLanguages}</label>
          <input className="input" placeholder="RU, EN, HE" value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">{dict.form.fieldRate}</label>
          <input type="number" min={0} className="input" value={form.hourlyRate} onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })} />
        </div>
        <div>
          <label className="label">{dict.form.fieldExperience}</label>
          <input type="number" min={0} className="input" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="label">{dict.form.fieldAbout} *</label>
        <textarea className="textarea" value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">{dict.form.fieldPhone} *</label>
          <input
            className="input"
            placeholder={dict.form.contactPlaceholder}
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">{dict.form.fieldEmail}</label>
          <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="btn-primary" disabled={!canSubmit}>
          {dict.cta.becomeWorker}
        </button>
        <Link href={`/${locale}/workers`} className="btn-secondary">
          {dict.form.seeWorkers}
        </Link>
      </div>
    </form>
  );
}
