"use client";

import { useState, useRef, useEffect } from "react";
import { Box, Main, Heading, Text, Spinner } from "grommet";
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
    <Box fill background="background-back">
      <Header />

      <Main
        ref={chatContainerRef}
        pad={{ top: "80px", bottom: "140px", horizontal: "medium" }}
        overflow="auto"
        flex
      >
        <Box width={{ max: "800px" }} style={{ margin: "0 auto", width: "100%" }}>
          {messages.length === 0 ? (
            <Box
              align="center"
              justify="center"
              pad="xlarge"
              height={{ min: "60vh" }}
              animation="fadeIn"
            >
              <Heading level={2} textAlign="center" margin={{ bottom: "small" }}>
                ברוכים הבאים למאמן פרומפטים
              </Heading>
              <Text
                size="large"
                color="text-weak"
                textAlign="center"
                style={{ maxWidth: "500px" }}
              >
                כתוב פרומפט וקבל משוב מפורט על היתרונות, החסרונות, וגרסה משופרת שתוכל להעתיק.
              </Text>
            </Box>
          ) : (
            <Box gap="small" pad={{ vertical: "medium" }}>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {loading && (
                <Box direction="row" justify="start" margin={{ bottom: "small" }}>
                  <Box
                    background="ai-card"
                    round="medium"
                    pad="medium"
                    elevation="xsmall"
                  >
                    <Box direction="row" gap="small" align="center">
                      <Spinner size="small" />
                      <Text color="text-weak">מנתח את הפרומפט...</Text>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Main>

      <ChatInput onSubmit={handleSubmit} disabled={loading} />
    </Box>
  );
}
