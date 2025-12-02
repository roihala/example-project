"use client";

import { Box, Select, Text } from "grommet";
import { AVAILABLE_MODELS, type ModelConfig } from "@/lib/models";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  disabled?: boolean;
}

export function ModelSelector({
  selectedModel,
  onModelChange,
  disabled = false,
}: ModelSelectorProps) {
  const selectedOption = AVAILABLE_MODELS.find((m) => m.id === selectedModel);

  return (
    <Box direction="row" align="center" gap="small">
      <Text size="small" color="text-weak">
        מודל:
      </Text>
      <Select
        options={AVAILABLE_MODELS}
        value={selectedOption}
        onChange={({ option }: { option: ModelConfig }) => onModelChange(option.id)}
        labelKey="name"
        valueKey="id"
        disabled={disabled}
        size="small"
        dropProps={{ style: { zIndex: 200 } }}
      />
    </Box>
  );
}
