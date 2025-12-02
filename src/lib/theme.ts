import { grommet } from "grommet";
import { deepMerge } from "grommet/utils";

export const lightTheme = deepMerge(grommet, {
  global: {
    colors: {
      brand: "#2563eb",
      "accent-1": "#3b82f6",
      "accent-2": "#60a5fa",
      focus: "#2563eb",
      "status-ok": "#16a34a",
      "status-critical": "#dc2626",
      "status-warning": "#ca8a04",
      background: {
        dark: "#111827",
        light: "#ffffff",
      },
      "background-back": {
        dark: "#0f172a",
        light: "#f8fafc",
      },
      "background-front": {
        dark: "#1e293b",
        light: "#ffffff",
      },
      "background-contrast": {
        dark: "#334155",
        light: "#f1f5f9",
      },
      text: {
        dark: "#f1f5f9",
        light: "#1e293b",
      },
      "text-strong": {
        dark: "#ffffff",
        light: "#0f172a",
      },
      "text-weak": {
        dark: "#94a3b8",
        light: "#64748b",
      },
      border: {
        dark: "#334155",
        light: "#e2e8f0",
      },
      "user-bubble": {
        dark: "#1e3a8a",
        light: "#dbeafe",
      },
      "ai-card": {
        dark: "#1e293b",
        light: "#f1f5f9",
      },
      pros: "#16a34a",
      cons: "#dc2626",
    },
    font: {
      family: "'Heebo', system-ui, sans-serif",
      size: "16px",
      height: "24px",
    },
    breakpoints: {
      small: { value: 768 },
      medium: { value: 1024 },
      large: {},
    },
    edgeSize: {
      none: "0px",
      hair: "1px",
      xxsmall: "4px",
      xsmall: "8px",
      small: "12px",
      medium: "16px",
      large: "24px",
      xlarge: "32px",
      xxlarge: "48px",
    },
    elevation: {
      light: {
        none: "none",
        xsmall: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        small: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        large: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      },
      dark: {
        none: "none",
        xsmall: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
        small: "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.3)",
        medium: "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)",
        large: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)",
      },
    },
    input: {
      padding: {
        horizontal: "12px",
        vertical: "10px",
      },
    },
    control: {
      border: {
        radius: "8px",
      },
    },
  },
  button: {
    border: {
      radius: "8px",
    },
    padding: {
      horizontal: "20px",
      vertical: "10px",
    },
    primary: {
      color: "white",
      background: { color: "brand" },
    },
    default: {
      border: { color: "border", width: "1px" },
    },
  },
  card: {
    container: {
      round: "medium",
      elevation: "small",
    },
    header: {
      pad: { horizontal: "medium", vertical: "small" },
    },
    body: {
      pad: "medium",
    },
    footer: {
      pad: { horizontal: "medium", vertical: "small" },
    },
  },
  heading: {
    level: {
      1: {
        medium: {
          size: "32px",
          height: "40px",
        },
      },
      2: {
        medium: {
          size: "24px",
          height: "32px",
        },
      },
      3: {
        medium: {
          size: "18px",
          height: "24px",
        },
      },
    },
    font: {
      family: "'Heebo', system-ui, sans-serif",
    },
  },
  text: {
    medium: {
      size: "16px",
      height: "24px",
    },
  },
  textArea: {
    extend: `
      border-radius: 12px;
      resize: none;
    `,
  },
  layer: {
    background: {
      dark: "#111827",
      light: "#ffffff",
    },
  },
});

export const darkTheme = deepMerge(lightTheme, {
  global: {
    colors: {
      background: "#111827",
      "background-back": "#0f172a",
      "background-front": "#1e293b",
      "background-contrast": "#334155",
      text: "#f1f5f9",
      "text-strong": "#ffffff",
      "text-weak": "#94a3b8",
      border: "#334155",
    },
  },
});
