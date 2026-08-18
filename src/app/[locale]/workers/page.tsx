import Link from "next/link";
import { getDict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import WorkerList from "@/components/WorkerList";

export default function WorkersPage({ params }: { params: { locale: Locale } }) {
  const dict = getDict(params.locale);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">{dict.workers.title}</h1>
        <Link href={`/${params.locale}/register-worker`} className="btn-secondary text-sm py-2 px-3">
          {dict.cta.becomeWorker}
        </Link>
      </div>
      <WorkerList locale={params.locale} dict={dict} />
    </div>
  );
}
