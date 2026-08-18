import type { Dict } from "@/i18n/dictionaries";

export default function Footer({ dict }: { dict: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
        <div>© {year} {dict.brand} · {dict.footer.country}</div>
        <div>{dict.footer.rights}</div>
      </div>
    </footer>
  );
}
