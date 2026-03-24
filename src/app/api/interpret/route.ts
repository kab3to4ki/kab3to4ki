import Anthropic from "@anthropic-ai/sdk";
import { type DrawnCard } from "@/lib/tarotCards";

const client = new Anthropic();

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

export async function POST(req: Request) {
  try {
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
      // Photo reading
      const questionText = question
        ? `My question is: "${question}"\n\n`
        : "";
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
      // Virtual spread reading
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

      const spreadName = spreadType || "Custom Spread";

      userContent = `${questionText}Spread: ${spreadName}\n\nCards drawn:\n\n${cardDescriptions}\n\nPlease provide a full, insightful reading of this spread.`;
    } else {
      return new Response("Invalid request: provide cards or image", { status: 400 });
    }

    const stream = await client.messages.stream({
      model: "claude-opus-4-6",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Interpret error:", error);
    return new Response("Failed to generate reading", { status: 500 });
  }
}
