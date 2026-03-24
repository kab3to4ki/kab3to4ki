export interface TarotCard {
  id: string;
  name: string;
  arcana: "major" | "minor";
  number?: number;
  suit?: "wands" | "cups" | "swords" | "pentacles";
  rank?: string;
  symbol: string;
  uprightKeywords: string[];
  reversedKeywords: string[];
}

export interface DrawnCard extends TarotCard {
  reversed: boolean;
  position?: string;
}

const MAJOR_ARCANA: TarotCard[] = [
  {
    id: "fool", name: "The Fool", arcana: "major", number: 0,
    symbol: "☽", uprightKeywords: ["beginnings", "innocence", "adventure", "free spirit"],
    reversedKeywords: ["recklessness", "naivety", "foolishness", "risk"],
  },
  {
    id: "magician", name: "The Magician", arcana: "major", number: 1,
    symbol: "∞", uprightKeywords: ["manifestation", "willpower", "resourcefulness", "skill"],
    reversedKeywords: ["manipulation", "poor planning", "untapped talent"],
  },
  {
    id: "high-priestess", name: "The High Priestess", arcana: "major", number: 2,
    symbol: "☽", uprightKeywords: ["intuition", "sacred knowledge", "mystery", "inner voice"],
    reversedKeywords: ["secrets", "disconnected intuition", "withdrawal"],
  },
  {
    id: "empress", name: "The Empress", arcana: "major", number: 3,
    symbol: "♀", uprightKeywords: ["femininity", "beauty", "nature", "nurturing", "abundance"],
    reversedKeywords: ["creative block", "dependence", "smothering", "neglect"],
  },
  {
    id: "emperor", name: "The Emperor", arcana: "major", number: 4,
    symbol: "♂", uprightKeywords: ["authority", "structure", "control", "fatherhood"],
    reversedKeywords: ["tyranny", "rigidity", "coldness", "lack of discipline"],
  },
  {
    id: "hierophant", name: "The Hierophant", arcana: "major", number: 5,
    symbol: "✝", uprightKeywords: ["tradition", "conformity", "morality", "ethics"],
    reversedKeywords: ["rebellion", "subversiveness", "personal beliefs", "freedom"],
  },
  {
    id: "lovers", name: "The Lovers", arcana: "major", number: 6,
    symbol: "♡", uprightKeywords: ["love", "harmony", "relationships", "choices", "alignment"],
    reversedKeywords: ["disharmony", "imbalance", "misalignment of values"],
  },
  {
    id: "chariot", name: "The Chariot", arcana: "major", number: 7,
    symbol: "★", uprightKeywords: ["control", "willpower", "success", "determination"],
    reversedKeywords: ["lack of control", "aggression", "scattered energy"],
  },
  {
    id: "strength", name: "Strength", arcana: "major", number: 8,
    symbol: "∞", uprightKeywords: ["strength", "courage", "patience", "compassion", "control"],
    reversedKeywords: ["weakness", "self-doubt", "lack of self-discipline"],
  },
  {
    id: "hermit", name: "The Hermit", arcana: "major", number: 9,
    symbol: "⚡", uprightKeywords: ["soul searching", "introspection", "solitude", "inner guidance"],
    reversedKeywords: ["isolation", "loneliness", "withdrawal", "anti-social"],
  },
  {
    id: "wheel-of-fortune", name: "Wheel of Fortune", arcana: "major", number: 10,
    symbol: "⊕", uprightKeywords: ["change", "cycles", "fate", "decisive moments", "luck"],
    reversedKeywords: ["resistance to change", "breaking cycles", "bad luck"],
  },
  {
    id: "justice", name: "Justice", arcana: "major", number: 11,
    symbol: "⚖", uprightKeywords: ["justice", "fairness", "truth", "cause and effect"],
    reversedKeywords: ["injustice", "lack of accountability", "dishonesty"],
  },
  {
    id: "hanged-man", name: "The Hanged Man", arcana: "major", number: 12,
    symbol: "♆", uprightKeywords: ["suspension", "letting go", "sacrifice", "new perspective"],
    reversedKeywords: ["delays", "resistance", "stalling", "indecision"],
  },
  {
    id: "death", name: "Death", arcana: "major", number: 13,
    symbol: "⚰", uprightKeywords: ["endings", "transitions", "change", "transformation"],
    reversedKeywords: ["resistance to change", "inability to move on", "stagnation"],
  },
  {
    id: "temperance", name: "Temperance", arcana: "major", number: 14,
    symbol: "△", uprightKeywords: ["balance", "moderation", "purpose", "meaning", "patience"],
    reversedKeywords: ["imbalance", "excess", "lack of long-term vision"],
  },
  {
    id: "devil", name: "The Devil", arcana: "major", number: 15,
    symbol: "◈", uprightKeywords: ["shadow self", "attachment", "restriction", "materialism"],
    reversedKeywords: ["releasing limiting beliefs", "exploring dark thoughts", "detachment"],
  },
  {
    id: "tower", name: "The Tower", arcana: "major", number: 16,
    symbol: "⚡", uprightKeywords: ["sudden change", "chaos", "revelation", "disruption"],
    reversedKeywords: ["personal transformation", "averting disaster", "delaying the inevitable"],
  },
  {
    id: "star", name: "The Star", arcana: "major", number: 17,
    symbol: "✦", uprightKeywords: ["hope", "spirituality", "renewal", "inspiration"],
    reversedKeywords: ["lack of faith", "despair", "discouragement", "disconnection"],
  },
  {
    id: "moon", name: "The Moon", arcana: "major", number: 18,
    symbol: "☽", uprightKeywords: ["illusion", "fear", "subconscious", "intuition", "the unknown"],
    reversedKeywords: ["release of fear", "confusion", "unhealthy fantasy"],
  },
  {
    id: "sun", name: "The Sun", arcana: "major", number: 19,
    symbol: "☀", uprightKeywords: ["positivity", "optimism", "success", "joy", "vitality"],
    reversedKeywords: ["negativity", "depression", "sadness", "blocked inner child"],
  },
  {
    id: "judgement", name: "Judgement", arcana: "major", number: 20,
    symbol: "☯", uprightKeywords: ["judgement", "rebirth", "inner calling", "absolution"],
    reversedKeywords: ["self-doubt", "refusal of self-examination", "ignoring a calling"],
  },
  {
    id: "world", name: "The World", arcana: "major", number: 21,
    symbol: "◎", uprightKeywords: ["completion", "integration", "accomplishment", "travel"],
    reversedKeywords: ["seeking closure", "shortcuts", "delays", "incompletion"],
  },
];

function makeMinor(
  suit: "wands" | "cups" | "swords" | "pentacles",
  rank: string,
  symbol: string,
  upright: string[],
  reversed: string[]
): TarotCard {
  return {
    id: `${rank}-of-${suit}`,
    name: `${rank.charAt(0).toUpperCase() + rank.slice(1)} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
    arcana: "minor",
    suit,
    rank,
    symbol,
    uprightKeywords: upright,
    reversedKeywords: reversed,
  };
}

const SUIT_SYMBOLS = { wands: "🪄", cups: "◡", swords: "✦", pentacles: "✪" };

const MINOR_ARCANA: TarotCard[] = [
  // WANDS
  makeMinor("wands","ace","🪄",["inspiration","new beginnings","growth","potential"],["delays","lack of motivation","weighed down"]),
  makeMinor("wands","2","🪄",["future planning","progress","decisions"],["fear of unknown","lack of planning","bad luck"]),
  makeMinor("wands","3","🪄",["progress","expansion","foresight","overseas"],["obstacles","delays","frustration"]),
  makeMinor("wands","4","🪄",["celebration","harmony","homecoming","completion"],["lack of support","transience","home conflicts"]),
  makeMinor("wands","5","🪄",["disagreements","competition","conflict","diversity"],["avoidance","chaos","aggression"]),
  makeMinor("wands","6","🪄",["success","public recognition","victory"],["private achievement","fall from grace","egotism"]),
  makeMinor("wands","7","🪄",["challenge","competition","perseverance"],["giving up","overwhelmed","yielding"]),
  makeMinor("wands","8","🪄",["speed","action","movement","quick decisions"],["delays","slowing down","hastiness"]),
  makeMinor("wands","9","🪄",["resilience","courage","persistence","test of faith"],["inner resources","struggle","paranoia"]),
  makeMinor("wands","10","🪄",["burden","extra responsibility","hard work"],["inability to delegate","martyr","collapse"]),
  makeMinor("wands","page","🪄",["inspiration","ideas","discovery","unlimited potential"],["hastiness","unreliability","immaturity"]),
  makeMinor("wands","knight","🪄",["energy","passion","inspired action","impulsiveness"],["passion project","haste","scattered energy"]),
  makeMinor("wands","queen","🪄",["courage","determination","independence","social butterfly"],["self-respect","introverted","demanding"]),
  makeMinor("wands","king","🪄",["natural leader","vision","entrepreneur","honour"],["impulsiveness","haste","ruthless"]),
  // CUPS
  makeMinor("cups","ace","◡",["love","new relationships","compassion","creativity"],["self-love","intuition blocked","emptiness"]),
  makeMinor("cups","2","◡",["unified love","partnership","attraction"],["disharmony","broken communication","withdrawn"]),
  makeMinor("cups","3","◡",["celebration","friendship","creativity","community"],["independence","alone time","overindulgence"]),
  makeMinor("cups","4","◡",["meditation","contemplation","apathy","reevaluation"],["retreat","withdrawn","no new offers"]),
  makeMinor("cups","5","◡",["regret","failure","disappointment","pessimism"],["personal setbacks","forgiveness","moving on"]),
  makeMinor("cups","6","◡",["nostalgia","reunion","childhood","innocence"],["living in past","naivety","unrealistic"]),
  makeMinor("cups","7","◡",["opportunities","choices","wishful thinking"],["alignment","clarity","wishful thinking"]),
  makeMinor("cups","8","◡",["disappointment","abandonment","withdrawal","escapism"],["trying again","indecision","confusion"]),
  makeMinor("cups","9","◡",["satisfaction","emotional stability","luxury","success"],["inner happiness","materialism","dissatisfaction"]),
  makeMinor("cups","10","◡",["divine love","blissful relationships","harmony","alignment"],["disconnection","misaligned values","broken home"]),
  makeMinor("cups","page","◡",["happy surprise","dreamer","sensitivity","idealism"],["emotional immaturity","insecurity","disappointment"]),
  makeMinor("cups","knight","◡",["creativity","romance","charm","imagination"],["unreliability","jealousy","moodiness"]),
  makeMinor("cups","queen","◡",["compassionate","calm","caring","intuitive"],["inner feelings","self-care","codependency"]),
  makeMinor("cups","king","◡",["emotionally balanced","compassionate","diplomatic"],["emotional manipulation","moodiness","volatility"]),
  // SWORDS
  makeMinor("swords","ace","✦",["clarity","breakthrough","sharp mind","truth"],["confusion","brutality","chaos"]),
  makeMinor("swords","2","✦",["difficult decisions","weighing options","indecision"],["indecision","confusion","information overload"]),
  makeMinor("swords","3","✦",["heartbreak","betrayal","sorrow","grief"],["recovery","forgiveness","moving on"]),
  makeMinor("swords","4","✦",["rest","relaxation","sanctuary","peace"],["exhaustion","burnout","stagnation"]),
  makeMinor("swords","5","✦",["conflict","disagreements","competition","defeat"],["reconciliation","making amends","past resentment"]),
  makeMinor("swords","6","✦",["transition","change","leaving behind","moving on"],["personal transition","resistance to change","unfinished"]),
  makeMinor("swords","7","✦",["betrayal","deception","getting away with it"],["imposter syndrome","self-deceit","coming clean"]),
  makeMinor("swords","8","✦",["imprisonment","entrapment","self-victimization"],["self-limiting beliefs","inner critic","releasing"]),
  makeMinor("swords","9","✦",["anxiety","worry","fear","depression"],["inner turmoil","hopelessness","threat"]),
  makeMinor("swords","10","✦",["painful endings","deep wounds","betrayal","back-stabbing"],["recovery","regeneration","resisting inevitable"]),
  makeMinor("swords","page","✦",["new ideas","curiosity","thirst for knowledge"],["manipulation","all talk","deception"]),
  makeMinor("swords","knight","✦",["ambitious","action-oriented","driven","incisive"],["no direction","disregard for consequences"]),
  makeMinor("swords","queen","✦",["complex","perceptive","clear-minded","direct"],["overly emotional","easily influenced","bitchy"]),
  makeMinor("swords","king","✦",["mental clarity","intellectual power","authority","truth"],["quiet power","inner truth","misuse of power"]),
  // PENTACLES
  makeMinor("pentacles","ace","✪",["new opportunity","prosperity","manifestation","abundance"],["lost opportunity","lack of planning","poor investments"]),
  makeMinor("pentacles","2","✪",["balance","adaptability","time management"],["disorganized","imbalance","scattered"]),
  makeMinor("pentacles","3","✪",["teamwork","initial implementation","collaboration"],["lack of teamwork","poor work","no ambition"]),
  makeMinor("pentacles","4","✪",["saving money","security","frugality","conservatism"],["over-spending","greed","self-protection"]),
  makeMinor("pentacles","5","✪",["financial loss","poverty","lack of resources"],["recovery from financial loss","spiritual poverty"]),
  makeMinor("pentacles","6","✪",["giving","receiving","sharing","charity"],["debt","strings attached","power dynamics"]),
  makeMinor("pentacles","7","✪",["long-term view","sustainable results","perseverance"],["lack of rewards","diversion","impatience"]),
  makeMinor("pentacles","8","✪",["skill development","craftsmanship","high standards"],["self-development","perfectionism","lacking ambition"]),
  makeMinor("pentacles","9","✪",["luxury","independence","self-sufficiency","refinement"],["superficiality","living beyond means","financial dependence"]),
  makeMinor("pentacles","10","✪",["legacy","culmination","family","ancestry"],["the dark side of wealth","family disputes","financial failure"]),
  makeMinor("pentacles","page","✪",["ambition","desire","diligence","financial opportunity"],["lack of commitment","greediness","laziness"]),
  makeMinor("pentacles","knight","✪",["efficiency","routine","hard work","responsibility"],["laziness","self-indulgence","perfectionism"]),
  makeMinor("pentacles","queen","✪",["practical","homebody","motherly","financially secure"],["financial independence","self-care","work-home conflict"]),
  makeMinor("pentacles","king","✪",["stability","security","discipline","abundance"],["financially inept","obsessed with wealth","corruption"]),
];

export const ALL_CARDS: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export function drawCards(count: number, positions: string[]): DrawnCard[] {
  const shuffled = [...ALL_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((card, i) => ({
    ...card,
    reversed: Math.random() > 0.7,
    position: positions[i],
  }));
}

export const SPREAD_TYPES = {
  single: {
    name: "Single Card",
    description: "One card for a clear, direct answer or daily guidance",
    count: 1,
    positions: ["Your Message"],
  },
  threeCard: {
    name: "Past · Present · Future",
    description: "Three cards revealing the timeline of your situation",
    count: 3,
    positions: ["Past", "Present", "Future"],
  },
  celticCross: {
    name: "Celtic Cross",
    description: "A deep 10-card spread for complex situations",
    count: 10,
    positions: [
      "The Situation",
      "The Challenge",
      "The Foundation",
      "The Recent Past",
      "Possible Outcome",
      "Near Future",
      "Your Approach",
      "External Influences",
      "Hopes & Fears",
      "Final Outcome",
    ],
  },
};
