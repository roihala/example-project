"use client";

import { useState } from "react";
import { Box, Card, CardBody, Text, Button, Heading } from "grommet";
import { Copy, Checkmark, StatusGood, StatusCritical } from "grommet-icons";

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
      <Box direction="row" justify="end" margin={{ bottom: "small" }}>
        <Card
          background="user-bubble"
          round="medium"
          pad="medium"
          width={{ max: "80%" }}
          elevation="xsmall"
        >
          <Text style={{ whiteSpace: "pre-wrap" }}>{message.content}</Text>
        </Card>
      </Box>
    );
  }

  const feedback = message.feedback;

  if (!feedback) {
    return (
      <Box direction="row" justify="start" margin={{ bottom: "small" }}>
        <Card
          background="ai-card"
          round="medium"
          pad="medium"
          width={{ max: "80%" }}
          elevation="xsmall"
        >
          <Text style={{ whiteSpace: "pre-wrap" }}>{message.content}</Text>
        </Card>
      </Box>
    );
  }

  return (
    <Box direction="row" justify="start" margin={{ bottom: "small" }}>
      <Card
        background="ai-card"
        round="medium"
        width={{ max: "85%" }}
        elevation="small"
      >
        <CardBody pad="medium" gap="medium">
          {feedback.pros.length > 0 && (
            <Box gap="xsmall">
              <Box direction="row" align="center" gap="xsmall">
                <StatusGood color="status-ok" size="small" />
                <Heading level={3} margin="none" color="status-ok">
                  יתרונות
                </Heading>
              </Box>
              <Box as="ul" margin="none" pad={{ right: "medium" }}>
                {feedback.pros.map((pro, i) => (
                  <Box as="li" key={i} margin={{ bottom: "xxsmall" }}>
                    <Text size="medium">{pro}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {feedback.cons.length > 0 && (
            <Box gap="xsmall">
              <Box direction="row" align="center" gap="xsmall">
                <StatusCritical color="status-critical" size="small" />
                <Heading level={3} margin="none" color="status-critical">
                  חסרונות
                </Heading>
              </Box>
              <Box as="ul" margin="none" pad={{ right: "medium" }}>
                {feedback.cons.map((con, i) => (
                  <Box as="li" key={i} margin={{ bottom: "xxsmall" }}>
                    <Text size="medium">{con}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {feedback.improvedPrompt && (
            <Box gap="xsmall">
              <Heading level={3} margin="none" color="brand">
                פרומפט משופר
              </Heading>
              <Box
                background="background-contrast"
                round="small"
                pad="small"
                direction="row"
                justify="between"
                align="start"
                gap="small"
              >
                <Text
                  style={{ whiteSpace: "pre-wrap", flex: 1 }}
                  size="medium"
                >
                  {feedback.improvedPrompt}
                </Text>
                <Button
                  icon={
                    copied ? (
                      <Checkmark color="status-ok" size="small" />
                    ) : (
                      <Copy size="small" />
                    )
                  }
                  onClick={() => handleCopy(feedback.improvedPrompt)}
                  tip="העתק פרומפט"
                  a11yTitle="העתק פרומפט"
                  hoverIndicator
                  size="small"
                />
              </Box>
              {copied && (
                <Text size="small" color="status-ok">
                  הועתק!
                </Text>
              )}
            </Box>
          )}
        </CardBody>
      </Card>
    </Box>
  );
}

export type { Message, FeedbackData };
