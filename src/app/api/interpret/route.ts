import Anthropic from "@anthropic-ai/sdk";
import { type DrawnCard } from "@/lib/tarotCards";

const SYSTEM_PROMPT = `You are a wise, compassionate tarot reader with deep knowledge of the cards and their symbolism.
You provide thoughtful, nuanced readings that are insightful yet grounded.

Guidelines:
- Interpret each card's meaning in context of the seeker's question
- Note whether cards are upright or reversed and adjust interpretations accordingly
- Consider the relationships between cards in the spread
- Speak warmly and directly to the seeker ("you" / "your")
- Blend practical wisdom with spiritual insight
- Be encouraging but honest — tarot reflects possibilities, not fixed fate
- Use clear sections when interpreting multiple cards
- Format with markdown for readability
- End with an empowering synthesis of the overall message

Remember: tarot reveals patterns and potentials — the seeker always has free will to shape their path.`;

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY is not set in environment variables" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = new Anthropic({ apiKey });
    const body = await req.json();
    const { question, cards, spreadType, image, imageType } = body as {
      question?: string;
      cards?: DrawnCard[];
      spreadType?: string;
      image?: string;
      imageType?: string;
    };

    let userContent: Anthropic.MessageParam["content"];

    if (image) {
      const questionText = question ? `My question is: "${question}"\n\n` : "";
      userContent = [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: (imageType as "image/jpeg" | "image/png" | "image/gif" | "image/webp") || "image/jpeg",
            data: image,
          },
        },
        {
          type: "text",
          text: `${questionText}I have laid out a tarot spread. Please look at the cards in this photo and provide a full reading. Identify each card you can see, note its position and whether it appears upright or reversed, then give a comprehensive interpretation of what the spread reveals.`,
        },
      ];
    } else if (cards && cards.length > 0) {
      const cardDescriptions = cards
        .map((card, i) => {
          const orientation = card.reversed ? "Reversed" : "Upright";
          const position = card.position ? `**Position: ${card.position}**` : `Card ${i + 1}`;
          return `${position}\n${card.name} (${orientation})`;
        })
        .join("\n\n");

      const questionText = question
        ? `The seeker's question: "${question}"\n\n`
        : "The seeker seeks general guidance.\n\n";

      userContent = `${questionText}Spread: ${spreadType || "Custom Spread"}\n\nCards drawn:\n\n${cardDescriptions}\n\nPlease provide a full, insightful reading of this spread.`;
    } else {
      return new Response("Invalid request: provide cards or image", { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => (block as Anthropic.TextBlock).text)
      .join("");

    return new Response(text, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Interpret error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
