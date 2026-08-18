import PostJobForm from "@/components/PostJobForm";
import { getDict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function PostJobPage({ params }: { params: { locale: Locale } }) {
  const dict = getDict(params.locale);
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">{dict.form.postJobTitle}</h1>
      <PostJobForm locale={params.locale} dict={dict} />
    </div>
  );
}
