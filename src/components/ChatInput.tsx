"use client";

import { useState, useRef } from "react";
import { Box, TextArea, Button, Spinner } from "grommet";
import { Send } from "grommet-icons";
import { ModelSelector } from "./ModelSelector";

interface ChatInputProps {
  onSubmit: (prompt: string) => void;
  disabled: boolean;
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ChatInput({ onSubmit, disabled, selectedModel, onModelChange }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSubmit(value.trim());
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box
      background="background-front"
      pad="medium"
      elevation="medium"
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <Box
        width={{ max: "800px" }}
        style={{ margin: "0 auto", width: "100%" }}
        gap="small"
      >
        <Box direction="row" justify="end">
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={onModelChange}
            disabled={disabled}
          />
        </Box>
        <Box direction="row" gap="small">
          <Box flex>
            <TextArea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="הכנס את הפרומפט שלך כאן..."
              disabled={disabled}
              rows={2}
              resize={false}
              style={{ direction: "rtl" }}
            />
          </Box>
          <Box justify="end">
            <Button
              primary
              icon={
                disabled ? (
                  <Spinner size="xsmall" color="white" />
                ) : (
                  <Send size="small" />
                )
              }
              onClick={handleSubmit}
              disabled={disabled || !value.trim()}
              tip="שלח"
              a11yTitle="שלח פרומפט"
              style={{ height: "48px", width: "48px" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
