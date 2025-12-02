"use client";

import { Header as GrommetHeader, Box, Button, Text } from "grommet";
import { Moon, Sun } from "grommet-icons";
import { useTheme } from "./ThemeProvider";

export function Header() {
  const { mode, toggleTheme } = useTheme();

  return (
    <GrommetHeader
      background="background-front"
      pad={{ horizontal: "medium", vertical: "small" }}
      elevation="small"
      style={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 100 }}
    >
      <Text size="xlarge" weight="bold" color="text-strong">
        מאמן פרומפטים
      </Text>
      <Button
        icon={mode === "light" ? <Moon size="medium" /> : <Sun size="medium" />}
        onClick={toggleTheme}
        tip={mode === "light" ? "עבור למצב כהה" : "עבור למצב בהיר"}
        a11yTitle={mode === "light" ? "עבור למצב כהה" : "עבור למצב בהיר"}
        hoverIndicator
      />
    </GrommetHeader>
  );
}
