import type { Dict } from "@/i18n/dictionaries";
import type { CategoryKey } from "@/lib/types";

const icons: Record<CategoryKey, string> = {
  cleaning: "🧽",
  handyman: "🔧",
  construction: "🏗️",
  moving: "📦",
  gardening: "🌿",
  childcare: "🧒",
  other: "✨",
};

export default function CategoryChip({
  category,
  dict,
}: {
  category: CategoryKey;
  dict: Dict;
}) {
  return (
    <span className="chip">
      <span className="me-1">{icons[category]}</span>
      {dict.category[category]}
    </span>
  );
}

export { icons as categoryIcons };
