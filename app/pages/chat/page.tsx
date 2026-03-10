"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { fontSpace } from "@/app/constants";
import { Streamdown } from "streamdown";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
  streaming?: boolean;
}

// ─── Recommended prompts ──────────────────────────────────────────────────────

const RECOMMENDED = [
  {
    icon: "☄",
    title: "City-scale impact",
    prompt: "What would happen if a 500m asteroid hit New York City?",
  },
  {
    icon: "🛰",
    title: "DART mission",
    prompt: "Explain the DART mission and how kinetic deflection works.",
  },
  {
    icon: "📊",
    title: "Torino Scale",
    prompt: "What is the Torino Scale and how is asteroid threat classified?",
  },
  {
    icon: "🔭",
    title: "Detection time",
    prompt: "Could we detect an asteroid on collision course in time to act?",
  },
  {
    icon: "🌍",
    title: "Historic impacts",
    prompt: "What were Earth's most significant asteroid impact events in history?",
  },
  {
    icon: "📡",
    title: "CNEOS tracking",
    prompt: "How does NASA's Center for Near-Earth Object Studies (CNEOS) track NEOs?",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[72%] px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed text-[hsl(215_30%_92%)]"
          style={{
            background:
              "linear-gradient(135deg, hsl(195 100% 60% / 0.18), hsl(260 80% 65% / 0.14))",
            border: "1px solid hsl(195 100% 60% / 0.25)",
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3">
      {/* Nova avatar */}
      <div className="flex-shrink-0 mt-1">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background:
              "linear-gradient(135deg, hsl(195 100% 60% / 0.25), hsl(260 80% 65% / 0.25))",
            border: "1px solid hsl(195 100% 60% / 0.3)",
            color: "hsl(195 100% 70%)",
            ...fontSpace,
          }}
        >
          N
        </div>
      </div>

      <div
        className="nova-md max-w-[78%] px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed text-[hsl(215_20%_80%)]"
        style={{
          background: "hsl(220 25% 9%)",
          border: "1px solid hsl(220 20% 16%)",
        }}
      >
        <Streamdown isAnimating={message.streaming}>
          {message.content}
        </Streamdown>
      </div>
    </div>
  );
}

// ─── Typing indicator (before first token arrives) ────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex justify-start gap-3">
      <div className="flex-shrink-0 mt-1">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background:
              "linear-gradient(135deg, hsl(195 100% 60% / 0.25), hsl(260 80% 65% / 0.25))",
            border: "1px solid hsl(195 100% 60% / 0.3)",
            color: "hsl(195 100% 70%)",
            ...fontSpace,
          }}
        >
          N
        </div>
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
        style={{
          background: "hsl(220 25% 9%)",
          border: "1px solid hsl(220 20% 16%)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[hsl(195_100%_60%_/_0.7)]"
            style={{
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<boolean>(false);

  const hasMessages = messages.length > 0;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto-resize textarea
  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [input, resizeTextarea]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);
      setIsTyping(true);
      abortRef.current = false;

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      const assistantId = `assistant-${Date.now()}`;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed }),
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        if (!res.body) throw new Error("No response body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let firstToken = true;

        while (true) {
          const { done, value } = await reader.read();
          if (done || abortRef.current) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const json = line.slice(6).trim();
            if (json === "[DONE]") break;
            try {
              const parsed = JSON.parse(json);
              const token: string | undefined =
                parsed.choices?.[0]?.delta?.content;
              if (token) {
                if (firstToken) {
                  setIsTyping(false);
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: assistantId,
                      role: "assistant",
                      content: token,
                      streaming: true,
                    },
                  ]);
                  firstToken = false;
                } else {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: m.content + token, streaming: true }
                        : m
                    )
                  );
                }
              }
            } catch {
              // skip malformed SSE chunks
            }
          }
        }

        // Mark streaming done
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, streaming: false } : m
          )
        );
      } catch (err) {
        setIsTyping(false);
        const errorMsg = err instanceof Error ? err.message : "Unknown error";
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: "assistant",
            content: `⚠ Something went wrong: ${errorMsg}`,
            streaming: false,
          },
        ]);
      } finally {
        setIsLoading(false);
        setIsTyping(false);
      }
    },
    [isLoading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Keyframe styles */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        .nova-md p { margin: 0 0 0.5em; }
        .nova-md p:last-child { margin-bottom: 0; }
        .nova-md h1, .nova-md h2, .nova-md h3,
        .nova-md h4, .nova-md h5, .nova-md h6 {
          color: hsl(210 40% 92%);
          font-weight: 600;
          margin: 0.75em 0 0.35em;
          line-height: 1.3;
        }
        .nova-md h1 { font-size: 1.2em; }
        .nova-md h2 { font-size: 1.1em; }
        .nova-md h3 { font-size: 1em; }
        .nova-md ul, .nova-md ol {
          padding-left: 1.4em;
          margin: 0.4em 0;
        }
        .nova-md li { margin: 0.2em 0; }
        .nova-md strong { color: white; font-weight: 600; }
        .nova-md em { color: hsl(215 20% 75%); font-style: italic; }
        .nova-md code {
          background: hsl(220 25% 14%);
          border: 1px solid hsl(220 20% 22%);
          border-radius: 4px;
          padding: 0.1em 0.4em;
          font-size: 0.88em;
          color: hsl(195 100% 70%);
        }
        .nova-md pre {
          background: hsl(220 25% 7%);
          border: 1px solid hsl(220 20% 18%);
          border-radius: 8px;
          padding: 0.75em 1em;
          overflow-x: auto;
          margin: 0.5em 0;
        }
        .nova-md pre code {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.85em;
          color: hsl(215 20% 80%);
        }
        .nova-md blockquote {
          border-left: 2px solid hsl(195 100% 60% / 0.4);
          padding-left: 0.75em;
          margin: 0.5em 0;
          color: hsl(215 20% 65%);
        }
        .nova-md hr { border-color: hsl(220 20% 18%); margin: 0.75em 0; }
      `}</style>

      <div className="relative flex flex-col min-h-screen w-full">
        {/* Background nebula blobs */}
        <div className="pointer-events-none fixed inset-0" aria-hidden="true">
          <div
            className="absolute top-[15%] left-[8%] w-[350px] h-[350px] rounded-full blur-[60px]"
            style={{
              background:
                "radial-gradient(circle, hsl(260 80% 65% / 0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-[20%] right-[8%] w-[450px] h-[450px] rounded-full blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, hsl(195 100% 60% / 0.06) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* ── EMPTY / WELCOME STATE ─────────────────────────────────────────── */}
        {!hasMessages && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-40">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="mb-3 flex items-center justify-center gap-2">
                {/* Nova icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-[0_0_24px_hsl(195_100%_60%_/_0.35)]"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(195 100% 60% / 0.2), hsl(260 80% 65% / 0.2))",
                    border: "1.5px solid hsl(195 100% 60% / 0.4)",
                    color: "hsl(195 100% 70%)",
                    ...fontSpace,
                  }}
                >
                  N
                </div>
              </div>

              <h1
                className="font-bold mb-2 bg-clip-text text-transparent"
                style={{
                  ...fontSpace,
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  background:
                    "linear-gradient(135deg, hsl(195 100% 70%), hsl(210 100% 80%), hsl(260 80% 75%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Nova AI
              </h1>

              <p
                className="text-white tracking-wide max-w-[420px] mx-auto"
               
              >
                Your planetary defense intelligence. Ask me anything about
                asteroids, space missions, and near-Earth objects.
              </p>
            </div>

            {/* Recommended prompts */}
            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {RECOMMENDED.map((item) => (
                <button
                  key={item.title}
                  onClick={() => sendMessage(item.prompt)}
                  disabled={isLoading}
                  className="group text-left px-4 py-3.5 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: "hsl(220 25% 8%)",
                    border: "1px solid hsl(220 20% 16%)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.border =
                      "1px solid hsl(195 100% 60% / 0.35)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "hsl(220 25% 10%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.border =
                      "1px solid hsl(220 20% 16%)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "hsl(220 25% 8%)";
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl leading-none mt-0.5">{item.icon}</span>
                    <div>
                      <p
                        className="text-xs font-semibold tracking-wider uppercase mb-1 text-[hsl(195_100%_60%_/_0.8)]"
                        style={fontSpace}
                      >
                        {item.title}
                      </p>
                      <p className="text-sm text-[hsl(215_20%_65%)] leading-snug group-hover:text-[hsl(215_20%_78%)] transition-colors">
                        {item.prompt}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── ACTIVE CHAT STATE ─────────────────────────────────────────────── */}
        {hasMessages && (
          <div className="flex-1 overflow-y-auto nova-scrollbar pt-24 pb-44 px-4">
            <div className="max-w-2xl mx-auto space-y-5">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Invisible anchor for scroll when on empty state */}
        {!hasMessages && <div ref={messagesEndRef} />}

        {/* ── FIXED INPUT BAR ──────────────────────────────────────────────── */}
        <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-6 pt-4"
          style={{
            background:
              "linear-gradient(to top, hsl(220 25% 5% / 0.97) 60%, transparent 100%)",
          }}
        >
          <div className="max-w-2xl mx-auto">
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_4px_32px_hsl(220_30%_5%_/_0.6),inset_0_1px_0_hsl(195_100%_60%_/_0.08)]"
              style={{
                background: "hsl(220 25% 9%)",
                border: "1px solid hsl(220 20% 18%)",
              }}
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Nova about asteroids, missions, threats…"
                disabled={isLoading}
                className="flex-1 resize-none bg-transparent text-sm text-[hsl(215_20%_85%)] placeholder-[hsl(215_20%_38%)] outline-none leading-relaxed disabled:opacity-50"
                style={{ maxHeight: "160px", minHeight: "24px" }}
              />

              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: input.trim() && !isLoading
                    ? "linear-gradient(135deg, hsl(195 100% 60% / 0.8), hsl(260 80% 65% / 0.8))"
                    : "hsl(220 20% 14%)",
                  border: "1px solid hsl(195 100% 60% / 0.25)",
                }}
              >
                {/* Send icon */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M22 2L11 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <p
              className="text-center text-[0.65rem] mt-2 text-white tracking-wide"
              style={fontSpace}
            >
              Nova · Planetary Defense AI · Press Enter to send
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
