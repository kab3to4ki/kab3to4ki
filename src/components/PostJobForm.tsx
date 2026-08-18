"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { addJob } from "@/lib/store";
import { categoryKeys, type CategoryKey } from "@/lib/types";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function PostJobForm({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "cleaning" as CategoryKey,
    city: String(dict.cities[0]),
    budget: "",
    name: "",
    contact: "",
  });
  const [ok, setOk] = useState(false);

  const canSubmit = useMemo(
    () =>
      form.title.trim() &&
      form.description.trim() &&
      form.city &&
      form.name.trim() &&
      form.contact.trim(),
    [form]
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    addJob({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      city: form.city,
      budget: form.budget ? Number(form.budget) : null,
      clientName: form.name.trim(),
      contact: form.contact.trim(),
    });
    setOk(true);
    setForm({ ...form, title: "", description: "", budget: "" });
  }

  return (
    <form onSubmit={submit} className="card grid gap-4">
      {ok && (
        <div className="rounded-lg bg-brand-50 border border-brand-200 text-brand-800 px-3 py-2 text-sm flex items-center justify-between gap-3">
          <span>{dict.form.successJob}</span>
          <Link href={`/${locale}/jobs`} className="underline">
            {dict.form.seeJobs} →
          </Link>
        </div>
      )}
      <div>
        <label className="label">{dict.form.fieldTitle} *</label>
        <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      </div>
      <div>
        <label className="label">{dict.form.fieldDescription} *</label>
        <textarea className="textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">{dict.form.fieldCategory}</label>
          <select className="select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as CategoryKey })}>
            {categoryKeys.map((k) => (
              <option key={k} value={k}>
                {dict.category[k]}
              </option>
            ))}
          </select>
        </div>
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
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">{dict.form.fieldBudget}</label>
          <input type="number" min={0} className="input" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
        </div>
        <div>
          <label className="label">{dict.form.fieldName} *</label>
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
      </div>
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
      <div className="flex gap-3">
        <button type="submit" className="btn-primary" disabled={!canSubmit}>
          {dict.cta.postJob}
        </button>
        <Link href={`/${locale}/jobs`} className="btn-secondary">
          {dict.form.seeJobs}
        </Link>
      </div>
    </form>
  );
}
