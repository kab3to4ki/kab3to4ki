"use client";

import { useState, useRef, useCallback } from "react";
import { drawCards, SPREAD_TYPES, type DrawnCard } from "@/lib/tarotCards";
import TarotCard from "@/components/TarotCard";

type Step =
  | "welcome"
  | "guide"
  | "modeSelect"
  | "spreadSelect"
  | "question"
  | "drawing"
  | "reading"
  | "photo"
  | "photoReading";

type Mode = "virtual" | "photo";
type SpreadKey = keyof typeof SPREAD_TYPES;

async function fetchInterpretation(
  body: Record<string, unknown>,
  onChunk: (text: string) => void
): Promise<void> {
  const response = await fetch("/api/interpret", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    let errMsg = `Server error ${response.status}`;
    try {
      const json = await response.json();
      if (json.error) errMsg = json.error;
    } catch {
      // ignore
    }
    throw new Error(errMsg);
  }
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value));
  }
}

export default function Home() {
  const [step, setStep] = useState<Step>("welcome");
  const [mode, setMode] = useState<Mode>("virtual");
  const [spreadKey, setSpreadKey] = useState<SpreadKey>("threeCard");
  const [question, setQuestion] = useState("");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [interpretation, setInterpretation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [photoBase64, setPhotoBase64] = useState<string>("");
  const [photoType, setPhotoType] = useState<string>("image/jpeg");
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const interpretRef = useRef<HTMLDivElement>(null);

  const handleStartReading = () => setStep("guide");
  const handleGuideNext = () => setStep("modeSelect");

  const handleModeSelect = (m: Mode) => {
    setMode(m);
    if (m === "virtual") setStep("spreadSelect");
    else setStep("photo");
  };

  const handleSpreadSelect = (key: SpreadKey) => {
    setSpreadKey(key);
    setStep("question");
  };

  const handleDrawCards = async () => {
    const spread = SPREAD_TYPES[spreadKey];
    const cards = drawCards(spread.count, spread.positions);
    setDrawnCards(cards);
    setStep("drawing");
    await new Promise((r) => setTimeout(r, 1200));
    setStep("reading");
    setInterpretation("");
  };

  const handleGetInterpretation = useCallback(async () => {
    setIsLoading(true);
    setInterpretation("");
    try {
      await fetchInterpretation(
        {
          question: question || undefined,
          cards: drawnCards,
          spreadType: SPREAD_TYPES[spreadKey].name,
        },
        (chunk) => {
          setInterpretation((prev) => prev + chunk);
          interpretRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setInterpretation(`Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  }, [question, drawnCards, spreadKey]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoType(file.type || "image/jpeg");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPhotoPreview(result);
      setPhotoBase64(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoInterpret = useCallback(async () => {
    if (!photoBase64) return;
    setStep("photoReading");
    setIsLoading(true);
    setInterpretation("");
    try {
      await fetchInterpretation(
        {
          question: question || undefined,
          image: photoBase64,
          imageType: photoType,
        },
        (chunk) => setInterpretation((prev) => prev + chunk)
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setInterpretation(`Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  }, [photoBase64, photoType, question]);

  const handleShare = async (cards: DrawnCard[], q: string, reading: string) => {
    const appUrl = "https://kab3to4ki.vercel.app";
    const cardLine = cards.length > 0
      ? cards.map(c => `${c.name}${c.reversed ? " (reversed)" : ""}`).join(", ")
      : "Photo reading";
    // Strip markdown for share text, take first ~300 chars
    const plainReading = reading
      .replace(/#{1,3}\s/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/\n+/g, " ")
      .trim()
      .slice(0, 300);
    const shareText = [
      "🔮 Mystic Tarot Reading",
      cards.length > 0 ? `🃏 ${cardLine}` : "",
      q ? `❓ "${q}"` : "",
      "",
      plainReading + (reading.length > 300 ? "…" : ""),
      "",
      `✨ Get your own reading: ${appUrl}`,
    ].filter(Boolean).join("\n");

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text: shareText, url: appUrl });
        return;
      } catch {
        // fallthrough to clipboard
      }
    }
    await navigator.clipboard.writeText(shareText);
    alert("Reading copied to clipboard! Paste it anywhere to share.");
  };

  const handleReset = () => {
    setStep("welcome");
    setQuestion("");
    setDrawnCards([]);
    setInterpretation("");
    setPhotoBase64("");
    setPhotoPreview("");
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <header className="w-full max-w-4xl text-center mb-8">
        <div className="text-gold-500 text-3xl mb-2 float-animation">✦ ☽ ✦</div>
        <h1 className="text-4xl md:text-5xl font-serif text-gold-gradient font-bold tracking-wide">
          Mystic Tarot
        </h1>
        <p className="text-purple-300 text-sm mt-1 tracking-widest uppercase">
          Ancient Wisdom · Modern Insight
        </p>
      </header>

      {/* === WELCOME === */}
      {step === "welcome" && (
        <div className="w-full max-w-lg text-center animate-fade-in">
          <div className="glow-panel rounded-2xl p-10 mb-8">
            <div className="text-6xl mb-6 float-animation">🔮</div>
            <h2 className="text-2xl font-serif text-white mb-4">
              Seek Guidance from the Cards
            </h2>
            <p className="text-purple-200 leading-relaxed mb-8">
              Tarot reveals the patterns and potentials in your life. Whether
              you seek clarity, direction, or deeper understanding — the cards
              have a message for you.
            </p>
            <button
              onClick={handleStartReading}
              className="btn-primary px-10 py-4 rounded-xl text-lg font-semibold tracking-wide w-full"
            >
              Begin Your Reading
            </button>
          </div>
          <p className="text-white/30 text-xs">
            Powered by AI · All readings are for guidance only
          </p>
        </div>
      )}

      {/* === GUIDE === */}
      {step === "guide" && (
        <div className="w-full max-w-lg animate-slide-up">
          <div className="glow-panel rounded-2xl p-8 mb-6">
            <h2 className="text-xl font-serif text-gold-400 mb-6 text-center">
              How Your Reading Works
            </h2>
            <div className="space-y-4">
              {[
                { n: "1", icon: "🌟", title: "Choose your method", desc: "Draw virtual cards or photograph your own physical spread" },
                { n: "2", icon: "❓", title: "Ask your question", desc: "Focus on what you truly want to know — be specific or open" },
                { n: "3", icon: "🎴", title: "The cards are drawn", desc: "Each card holds a message relevant to your situation" },
                { n: "4", icon: "📖", title: "Receive your reading", desc: "An in-depth interpretation of every card and the overall message" },
              ].map((item) => (
                <div key={item.n} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center flex-shrink-0 text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-gold-400 font-semibold text-sm">{item.title}</div>
                    <div className="text-white/60 text-sm mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleGuideNext}
            className="btn-primary w-full py-4 rounded-xl font-semibold text-lg"
          >
            I&apos;m Ready →
          </button>
        </div>
      )}

      {/* === MODE SELECT === */}
      {step === "modeSelect" && (
        <div className="w-full max-w-xl animate-slide-up">
          <h2 className="text-xl font-serif text-center text-gold-400 mb-8">
            How would you like to read?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleModeSelect("virtual")}
              className="glow-panel rounded-2xl p-8 text-center hover:border-gold-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎴</div>
              <h3 className="text-lg font-serif text-gold-400 mb-2">Virtual Spread</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Let the cards choose themselves. I&apos;ll shuffle the full 78-card
                deck and draw for you.
              </p>
              <div className="mt-4 text-xs text-purple-400">No physical cards needed</div>
            </button>
            <button
              onClick={() => handleModeSelect("photo")}
              className="glow-panel rounded-2xl p-8 text-center hover:border-gold-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📷</div>
              <h3 className="text-lg font-serif text-gold-400 mb-2">Photo Reading</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Lay out your own physical cards and upload a photo. I&apos;ll read
                your spread.
              </p>
              <div className="mt-4 text-xs text-purple-400">Use your own deck</div>
            </button>
          </div>
        </div>
      )}

      {/* === SPREAD SELECT === */}
      {step === "spreadSelect" && (
        <div className="w-full max-w-xl animate-slide-up">
          <h2 className="text-xl font-serif text-center text-gold-400 mb-2">
            Choose Your Spread
          </h2>
          <p className="text-center text-white/50 text-sm mb-8">
            Different spreads reveal different depths
          </p>
          <div className="space-y-3">
            {(Object.keys(SPREAD_TYPES) as SpreadKey[]).map((key) => {
              const spread = SPREAD_TYPES[key];
              return (
                <button
                  key={key}
                  onClick={() => handleSpreadSelect(key)}
                  className="glow-panel rounded-xl p-5 w-full text-left hover:border-gold-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gold-400 font-semibold group-hover:text-gold-300">
                        {spread.name}
                      </div>
                      <div className="text-white/50 text-sm mt-1">{spread.description}</div>
                    </div>
                    <div className="text-3xl ml-4 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      {key === "single" ? "☽" : key === "threeCard" ? "✦✦✦" : "✪"}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-purple-400">
                    {spread.count} {spread.count === 1 ? "card" : "cards"} ·{" "}
                    {spread.positions.join(" · ")}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* === QUESTION (virtual) === */}
      {step === "question" && (
        <div className="w-full max-w-lg animate-slide-up">
          <div className="glow-panel rounded-2xl p-8 mb-6">
            <h2 className="text-xl font-serif text-gold-400 mb-2 text-center">
              What is your question?
            </h2>
            <p className="text-white/50 text-sm text-center mb-6">
              Focus your mind and heart. You may leave this blank for a general reading.
            </p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What should I focus on in my career right now? Or what does this relationship need?"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-gold-500/50 resize-none h-28 text-sm"
            />
            <div className="mt-4 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
              <p className="text-purple-300 text-xs leading-relaxed">
                <span className="text-gold-500">Tip:</span> Take a moment to breathe and
                concentrate on your question before drawing. The cards respond to your energy.
              </p>
            </div>
          </div>
          <button
            onClick={handleDrawCards}
            className="btn-primary w-full py-4 rounded-xl font-semibold text-lg"
          >
            Draw the Cards ✦
          </button>
        </div>
      )}

      {/* === DRAWING ANIMATION === */}
      {step === "drawing" && (
        <div className="w-full max-w-lg text-center animate-fade-in">
          <div className="glow-panel rounded-2xl p-12">
            <div className="text-6xl mb-6 animate-spin-slow">✦</div>
            <h2 className="text-2xl font-serif text-gold-400 mb-3">
              The Cards Are Being Drawn...
            </h2>
            <p className="text-purple-300 text-sm">
              The universe is aligning your message
            </p>
          </div>
        </div>
      )}

      {/* === VIRTUAL READING === */}
      {step === "reading" && (
        <div className="w-full max-w-4xl animate-fade-in">
          <div className="glow-panel rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-serif text-gold-400 text-center mb-1">
              {SPREAD_TYPES[spreadKey].name}
            </h2>
            {question && (
              <p className="text-center text-white/50 text-sm italic mb-6">
                &quot;{question}&quot;
              </p>
            )}
            <div
              className={`flex flex-wrap gap-4 justify-center ${
                drawnCards.length > 5 ? "gap-3" : "gap-6"
              }`}
            >
              {drawnCards.map((card, i) => (
                <TarotCard
                  key={card.id + i}
                  card={card}
                  index={i}
                  compact={drawnCards.length > 6}
                />
              ))}
            </div>
          </div>

          {!interpretation && !isLoading && (
            <div className="text-center mb-6">
              <div className="glow-panel rounded-xl p-6 mb-4">
                <h3 className="text-gold-400 font-serif mb-2">Reading Your Cards</h3>
                <div className="space-y-2 text-sm text-white/60 text-left max-w-md mx-auto">
                  {drawnCards.map((card, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-gold-500">✦</span>
                      <span className="font-medium text-white/80">{card.position}:</span>
                      <span>{card.name} ({card.reversed ? "Reversed" : "Upright"})</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={handleGetInterpretation}
                className="btn-primary px-12 py-4 rounded-xl font-semibold text-lg"
              >
                Reveal Your Reading ✦
              </button>
            </div>
          )}

          {isLoading && !interpretation && (
            <div className="text-center py-8">
              <div className="text-4xl animate-spin-slow mb-4">☽</div>
              <p className="text-purple-300">The oracle is speaking...</p>
            </div>
          )}

          {interpretation && (
            <div className="glow-panel rounded-2xl p-6 md:p-8">
              <h3 className="text-gold-400 font-serif text-lg mb-4 text-center">
                Your Reading
              </h3>
              <div
                className="interpretation-text text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMarkdown(interpretation) }}
              />
              {isLoading && (
                <span className="inline-block w-2 h-4 bg-gold-500 animate-pulse ml-1 align-middle" />
              )}
              <div ref={interpretRef} />
            </div>
          )}

          {interpretation && !isLoading && (
            <div className="flex gap-3 mt-6 justify-center flex-wrap">
              <button
                onClick={() => handleShare(drawnCards, question, interpretation)}
                className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                ↗ Share Reading
              </button>
              <button
                onClick={handleGetInterpretation}
                className="btn-mystic px-6 py-3 rounded-xl text-sm font-semibold"
              >
                Re-read Cards
              </button>
              <button
                onClick={handleDrawCards}
                className="btn-mystic px-6 py-3 rounded-xl text-sm font-semibold"
              >
                Draw Again
              </button>
              <button
                onClick={handleReset}
                className="btn-mystic px-6 py-3 rounded-xl text-sm font-semibold"
              >
                New Reading
              </button>
            </div>
          )}
        </div>
      )}

      {/* === PHOTO UPLOAD === */}
      {step === "photo" && (
        <div className="w-full max-w-lg animate-slide-up">
          <div className="glow-panel rounded-2xl p-8 mb-6">
            <h2 className="text-xl font-serif text-gold-400 mb-2 text-center">
              Upload Your Spread
            </h2>
            <div className="bg-purple-900/20 rounded-xl p-4 mb-6 border border-purple-500/20">
              <h3 className="text-purple-300 font-semibold text-sm mb-2">How to prepare:</h3>
              <ol className="text-white/60 text-sm space-y-1 list-decimal list-inside">
                <li>Shuffle your deck while focusing on your question</li>
                <li>Lay out the cards in your chosen spread pattern</li>
                <li>Take a clear photo from directly above</li>
                <li>Make sure card names are visible if possible</li>
              </ol>
            </div>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                photoPreview
                  ? "border-gold-500/50"
                  : "border-white/20 hover:border-gold-500/40"
              }`}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Your tarot spread"
                  className="max-h-64 mx-auto rounded-lg"
                />
              ) : (
                <>
                  <div className="text-4xl mb-3">📷</div>
                  <p className="text-white/60 text-sm">Click to upload your photo</p>
                  <p className="text-white/30 text-xs mt-1">JPG, PNG, WebP supported</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <div className="mt-5">
              <label className="text-sm text-gold-500 block mb-2">
                Your question (optional)
              </label>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What would you like to know?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold-500/50 text-sm"
              />
            </div>
          </div>
          <button
            onClick={handlePhotoInterpret}
            disabled={!photoBase64}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              photoBase64
                ? "btn-primary"
                : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            {photoBase64 ? "Read My Spread ✦" : "Upload a photo to continue"}
          </button>
          <button
            onClick={() => setStep("modeSelect")}
            className="w-full mt-3 py-3 text-white/40 text-sm hover:text-white/60 transition-colors"
          >
            ← Choose a different method
          </button>
        </div>
      )}

      {/* === PHOTO READING === */}
      {step === "photoReading" && (
        <div className="w-full max-w-3xl animate-fade-in">
          <div className="glow-panel rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-serif text-gold-400 text-center mb-4">
              Reading Your Spread
            </h2>
            {question && (
              <p className="text-center text-white/50 text-sm italic mb-4">
                &quot;{question}&quot;
              </p>
            )}
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Your tarot spread"
                className="max-h-48 mx-auto rounded-lg mb-4 opacity-80"
              />
            )}
          </div>
          {isLoading && !interpretation && (
            <div className="text-center py-8">
              <div className="text-4xl animate-spin-slow mb-4">☽</div>
              <p className="text-purple-300">Reading the energies of your cards...</p>
            </div>
          )}
          {interpretation && (
            <div className="glow-panel rounded-2xl p-6 md:p-8">
              <h3 className="text-gold-400 font-serif text-lg mb-4 text-center">
                Your Reading
              </h3>
              <div
                className="interpretation-text text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMarkdown(interpretation) }}
              />
              {isLoading && (
                <span className="inline-block w-2 h-4 bg-gold-500 animate-pulse ml-1 align-middle" />
              )}
              <div ref={interpretRef} />
            </div>
          )}
          {interpretation && !isLoading && (
            <div className="flex gap-3 mt-6 justify-center flex-wrap">
              <button
                onClick={() => handleShare([], question, interpretation)}
                className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                ↗ Share Reading
              </button>
              <button
                onClick={handlePhotoInterpret}
                className="btn-mystic px-6 py-3 rounded-xl text-sm font-semibold"
              >
                Read Again
              </button>
              <button
                onClick={handleReset}
                className="btn-mystic px-6 py-3 rounded-xl text-sm font-semibold"
              >
                New Reading
              </button>
            </div>
          )}
        </div>
      )}

      <footer className="mt-16 text-center text-white/20 text-xs">
        <p>✦ Trust your intuition · The cards reveal what is within ✦</p>
      </footer>
    </main>
  );
}

function formatMarkdown(text: string): string {
  const lines = text.split("\n");
  let html = "";
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) { html += "</ul>"; inList = false; }
      continue;
    }
    if (trimmed.startsWith("### ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h3 class="card-header">${trimmed.slice(4)}</h3>`;
    } else if (trimmed.startsWith("## ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h2 class="section-header">${trimmed.slice(3)}</h2>`;
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList) { html += "<ul>"; inList = true; }
      const content = trimmed.slice(2).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
      html += `<li>${content}</li>`;
    } else if (trimmed === "---") {
      if (inList) { html += "</ul>"; inList = false; }
      html += "<hr/>";
    } else {
      if (inList) { html += "</ul>"; inList = false; }
      const content = trimmed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
      html += `<p>${content}</p>`;
    }
  }
  if (inList) html += "</ul>";
  return html;
}
