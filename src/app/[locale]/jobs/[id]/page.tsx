import JobDetail from "@/components/JobDetail";
import { getDict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function JobDetailPage({
  params,
}: {
  params: { locale: Locale; id: string };
}) {
  const dict = getDict(params.locale);
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <JobDetail locale={params.locale} dict={dict} jobId={params.id} />
    </div>
  );
}
