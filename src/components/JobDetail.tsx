"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { addResponse, listJobs, listResponses, seedIfEmpty, subscribe } from "@/lib/store";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import CategoryChip from "@/components/CategoryChip";
import type { Job, JobResponse } from "@/lib/types";

export default function JobDetail({
  locale,
  dict,
  jobId,
}: {
  locale: Locale;
  dict: Dict;
  jobId: string;
}) {
  const [job, setJob] = useState<Job | null>(null);
  const [responses, setResponses] = useState<JobResponse[]>([]);
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    seedIfEmpty();
    const load = () => {
      setJob(listJobs().find((j) => j.id === jobId) ?? null);
      setResponses(listResponses(jobId));
    };
    load();
    return subscribe(load);
  }, [jobId]);

  const canSubmit = useMemo(
    () => form.name.trim() && form.contact.trim() && form.message.trim(),
    [form]
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    addResponse({
      jobId,
      workerName: form.name.trim(),
      contact: form.contact.trim(),
      message: form.message.trim(),
    });
    setSent(true);
    setForm({ name: "", contact: "", message: "" });
  }

  if (!job) {
    return (
      <div className="card text-slate-500">
        <Link href={`/${locale}/jobs`} className="text-brand-700 hover:underline">
          ← {dict.form.seeJobs}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href={`/${locale}/jobs`} className="text-sm text-brand-700 hover:underline">
        ← {dict.form.seeJobs}
      </Link>

      <div className="card">
        <div className="flex flex-wrap gap-2 mb-3">
          <CategoryChip category={job.category} dict={dict} />
          <span className="chip bg-slate-100 text-slate-700">📍 {job.city}</span>
          {job.budget != null && (
            <span className="chip bg-brand-100 text-brand-800">₪{job.budget}</span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
        <p className="text-slate-700 mt-3 whitespace-pre-line">{job.description}</p>
        <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600 grid sm:grid-cols-2 gap-2">
          <div>
            <span className="text-slate-500">{dict.jobs.contact}: </span>
            <span className="font-medium text-slate-800">{job.clientName}</span>
          </div>
          <div className="sm:text-right">
            <span className="text-slate-500">{dict.jobs.posted}: </span>
            {new Date(job.createdAt).toLocaleString(locale)}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-3">{dict.responses.respondTitle}</h2>
        {sent && (
          <div className="mb-3 rounded-lg bg-brand-50 border border-brand-200 text-brand-800 px-3 py-2 text-sm">
            {dict.responses.sent}
          </div>
        )}
        <form onSubmit={submit} className="grid gap-3">
          <div>
            <label className="label">{dict.form.fieldName}</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="label">{dict.form.fieldPhone}</label>
            <input
              className="input"
              placeholder={dict.form.contactPlaceholder}
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label">{dict.responses.yourMessage}</label>
            <textarea
              className="textarea"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>
          <div>
            <button type="submit" className="btn-primary" disabled={!canSubmit}>
              {dict.cta.apply}
            </button>
          </div>
        </form>
      </div>

      {responses.length > 0 && (
        <div className="card">
          <h3 className="font-semibold mb-3">{responses.length} ↩</h3>
          <ul className="divide-y divide-slate-100">
            {responses.map((r) => (
              <li key={r.id} className="py-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-800">{r.workerName}</span>
                  <span className="text-slate-500">{new Date(r.createdAt).toLocaleString(locale)}</span>
                </div>
                <div className="text-slate-700 mt-1">{r.message}</div>
                <div className="text-xs text-slate-500 mt-1">{r.contact}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
