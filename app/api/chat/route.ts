import { NextRequest, NextResponse } from "next/server";

const NOVA_ENDPOINT = "https://api.nova.amazon.com/v1/chat/completions";
const MODEL_ID = "nova-2-lite-v1";

const SYSTEM_PROMPT = `You are Nova, an expert planetary defense scientist and space exploration specialist embedded in NeoPulse — an asteroid monitoring observatory. You specialize in:

- Near-Earth Objects (NEOs), asteroids, and comets
- Planetary defense strategies (kinetic deflection, gravity tractors, nuclear standoff)
- Historic and potential future impact events
- NASA, ESA, and global space agency missions (DART, OSIRIS-REx, etc.)
- Asteroid classification systems (Torino Scale, Palermo Scale, spectral types)
- Detection networks like NASA's CNEOS, Spaceguard, Pan-STARRS, Catalina Sky Survey

Respond with vivid, scientifically grounded answers. Use **bold** for critical figures, key terms, and threat classifications. Be direct, precise, and authoritative. Keep responses concise but impactful — 150–250 words unless a complex topic warrants more detail.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.NOVA_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "NOVA_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const body = {
      model: MODEL_ID,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message.trim() },
      ],
      max_tokens: 400,
      temperature: 0.8,
      top_p: 0.9,
      stream: true,
    };

    const response = await fetch(NOVA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[chat] error:", response.status, errText);
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
    console.error("[chat] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
