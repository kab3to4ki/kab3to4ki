"use client";

import { type DrawnCard } from "@/lib/tarotCards";

interface TarotCardProps {
  card: DrawnCard;
  index?: number;
  showPosition?: boolean;
  compact?: boolean;
}

const SUIT_COLORS = {
  wands: "from-amber-900/40 to-red-950/40",
  cups: "from-blue-900/40 to-indigo-950/40",
  swords: "from-slate-800/40 to-gray-950/40",
  pentacles: "from-emerald-900/40 to-green-950/40",
  major: "from-purple-900/40 to-violet-950/40",
};

const SUIT_ACCENT = {
  wands: "text-amber-400",
  cups: "text-blue-400",
  swords: "text-slate-300",
  pentacles: "text-emerald-400",
  major: "text-purple-300",
};

export default function TarotCard({ card, index = 0, showPosition = true, compact = false }: TarotCardProps) {
  const suitKey = card.arcana === "major" ? "major" : (card.suit ?? "major");
  const gradientClass = SUIT_COLORS[suitKey as keyof typeof SUIT_COLORS];
  const accentClass = SUIT_ACCENT[suitKey as keyof typeof SUIT_ACCENT];

  const delay = `${index * 0.15}s`;

  if (compact) {
    return (
      <div
        className="tarot-card rounded-lg p-3 flex items-center gap-3 animate-fade-in"
        style={{ animationDelay: delay }}
      >
        <div className={`w-10 h-10 rounded bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0`}>
          <span className={`text-xl ${card.reversed ? "rotate-180 inline-block" : ""} ${accentClass}`}>
            {card.symbol}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gold-300 truncate">{card.name}</div>
          {card.position && (
            <div className="text-xs text-purple-400">{card.position}</div>
          )}
        </div>
        <span className={card.reversed ? "card-reversed-badge" : "card-upright-badge"}>
          {card.reversed ? "Rev" : "Up"}
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center gap-2 animate-card-flip"
      style={{ animationDelay: delay }}
    >
      {showPosition && card.position && (
        <div className="text-xs text-purple-400 text-center font-medium tracking-wide uppercase">
          {card.position}
        </div>
      )}

      <div className={`tarot-card rounded-xl ${card.reversed ? "reversed" : ""} w-32 h-52 flex flex-col`}>
        {/* Inner decorative border */}
        <div className={`flex-1 m-2 rounded-lg bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-between p-2`}>
          {/* Top ornament */}
          <div className="text-center">
            {card.arcana === "major" && card.number !== undefined && (
              <div className="text-xs text-gold-500 font-serif tracking-widest">
                {toRoman(card.number)}
              </div>
            )}
            {card.arcana === "minor" && card.rank && (
              <div className="text-xs text-gold-500 tracking-wider uppercase">
                {card.rank}
              </div>
            )}
          </div>

          {/* Center symbol */}
          <div className="card-symbol flex flex-col items-center">
            <span className={`text-4xl ${accentClass}`}>{card.symbol}</span>
          </div>

          {/* Card name */}
          <div className="text-center">
            <div className="text-xs text-white/80 font-semibold leading-tight text-center">
              {card.name}
            </div>
            {card.arcana === "minor" && card.suit && (
              <div className={`text-xs ${accentClass} capitalize mt-0.5`}>
                {card.suit}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Orientation badge */}
      <span className={card.reversed ? "card-reversed-badge" : "card-upright-badge"}>
        {card.reversed ? "Reversed" : "Upright"}
      </span>

      {/* Keywords */}
      <div className="text-center max-w-32">
        <div className="text-xs text-white/50 leading-tight">
          {(card.reversed ? card.reversedKeywords : card.uprightKeywords)
            .slice(0, 2)
            .join(" · ")}
        </div>
      </div>
    </div>
  );
}

function toRoman(num: number): string {
  const romanNumerals = [
    ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
     "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"]
  ];
  return romanNumerals[0][num] || String(num);
}
