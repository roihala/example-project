"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { ChatMessage, Message, FeedbackData } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (prompt: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "שגיאה בניתוח הפרומפט");
      }

      const feedback: FeedbackData = {
        pros: data.pros || [],
        cons: data.cons || [],
        improvedPrompt: data.improvedPrompt || "",
      };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "",
        feedback,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: error instanceof Error ? error.message : "שגיאה לא צפויה",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main
        ref={chatContainerRef}
        className="max-w-3xl mx-auto pt-20 pb-32 px-4 overflow-y-auto"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ברוכים הבאים למאמן פרומפטים
            </h2>
            <p className="text-foreground/70 max-w-md">
              כתוב פרומפט וקבל משוב מפורט על היתרונות, החסרונות, וגרסה משופרת שתוכל להעתיק.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="bg-ai-card rounded-2xl rounded-bl-sm px-5 py-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <ChatInput onSubmit={handleSubmit} disabled={loading} />
    </div>
  );
}
