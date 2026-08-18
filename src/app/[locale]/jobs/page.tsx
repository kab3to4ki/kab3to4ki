import Link from "next/link";
import { getDict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import JobList from "@/components/JobList";
import type { CategoryKey } from "@/lib/types";
import { categoryKeys } from "@/lib/types";

export default function JobsPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { category?: string };
}) {
  const dict = getDict(params.locale);
  const initial = (categoryKeys as string[]).includes(searchParams.category ?? "")
    ? (searchParams.category as CategoryKey)
    : "all";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">{dict.jobs.title}</h1>
        <Link href={`/${params.locale}/post-job`} className="btn-primary text-sm py-2 px-3">
          {dict.cta.postJob}
        </Link>
      </div>
      <JobList locale={params.locale} dict={dict} initialCategory={initial} />
    </div>
  );
}
