"use client";

import { useState } from "react";

interface FeedbackData {
  pros: string[];
  cons: string[];
  improvedPrompt: string;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  feedback?: FeedbackData;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.type === "user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[80%] bg-user-bubble rounded-2xl rounded-br-sm px-4 py-3">
          <p className="text-foreground whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  const feedback = message.feedback;

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%] bg-ai-card rounded-2xl rounded-bl-sm px-5 py-4">
        {feedback ? (
          <div className="space-y-4">
            {feedback.pros.length > 0 && (
              <div>
                <h3 className="font-bold text-pros mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-pros rounded-full"></span>
                  יתרונות
                </h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/90">
                  {feedback.pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.cons.length > 0 && (
              <div>
                <h3 className="font-bold text-cons mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-cons rounded-full"></span>
                  חסרונות
                </h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/90">
                  {feedback.cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.improvedPrompt && (
              <div>
                <h3 className="font-bold text-accent mb-2">פרומפט משופר</h3>
                <div className="bg-background/50 rounded-lg p-3 relative">
                  <p className="text-foreground whitespace-pre-wrap pl-10">
                    {feedback.improvedPrompt}
                  </p>
                  <button
                    onClick={() => handleCopy(feedback.improvedPrompt)}
                    className="absolute left-2 top-2 p-1.5 rounded hover:bg-foreground/10 transition-colors"
                    aria-label="העתק פרומפט"
                  >
                    {copied ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-pros"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-sm text-pros mt-1">הועתק!</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-foreground whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </div>
  );
}

export type { Message, FeedbackData };
