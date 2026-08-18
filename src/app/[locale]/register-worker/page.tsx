import RegisterWorkerForm from "@/components/RegisterWorkerForm";
import { getDict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function RegisterWorkerPage({ params }: { params: { locale: Locale } }) {
  const dict = getDict(params.locale);
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">{dict.form.workerTitle}</h1>
      <RegisterWorkerForm locale={params.locale} dict={dict} />
    </div>
  );
}
