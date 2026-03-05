import { NextRequest, NextResponse } from "next/server";

// Amazon Nova – OpenAI-compatible endpoint
const NOVA_ENDPOINT = "https://api.nova.amazon.com/v1/chat/completions";
const MODEL_ID = "nova-2-lite-v1";

interface AsteroidPayload {
  name: string;
  diameterMin: number;
  diameterMax: number;
  velocity: number;
  missDistance: number;
  threatLevel: "low" | "moderate" | "high";
  isHazardous: boolean;
  classification: string;
  approachDate: string;
}

function buildPrompt(a: AsteroidPayload): string {
  const approachFormatted = new Date(a.approachDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `You are a planetary defense scientist. In 2–3 short sentences (150 words max), describe what would happen if this asteroid hit Earth. Be specific to its actual size and speed. Be direct and vivid — no intro, no sign-off, just the impact.

ASTEROID: ${a.name} | ${a.diameterMin}–${a.diameterMax}m wide | ${a.velocity.toLocaleString()} km/h | ${a.missDistance.toFixed(2)} lunar distances away | ${a.threatLevel.toUpperCase()} threat | Approach: ${approachFormatted}`;
}

export async function POST(req: NextRequest) {
  try {
    const asteroid: AsteroidPayload = await req.json();

    const apiKey = process.env.NOVA_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "NOVA_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const bedrockBody = {
      model: MODEL_ID,
      messages: [
        {
          role: "system",
          content:
            "You are an expert planetary defense scientist who delivers vivid, scientifically grounded asteroid impact assessments in clear flowing prose.",
        },
        {
          role: "user",
          content: buildPrompt(asteroid),
        },
      ],
      max_tokens: 200,
      temperature: 0.85,
      top_p: 0.9,
      stream: true,
    };

    const response = await fetch(NOVA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(bedrockBody),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[nova] error:", response.status, errText);
      return NextResponse.json(
        { error: `Request failed: ${response.status}` },
        { status: response.status }
      );
    }

    // Pipe the SSE stream straight through to the browser
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("[nova] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
