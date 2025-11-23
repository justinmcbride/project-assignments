"use client";

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { ReactNode } from "react";

const theme = extendTheme({
  fontFamily: {
    body: "var(--font-inter)",
    display: "var(--font-outfit)",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
    },
  },
  components: {
    JoyTypography: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.level?.startsWith("h") && {
            fontFamily: "var(--font-outfit)",
          }),
        }),
      },
    },
  },
});

export const ThemeRegistry = ({ children }: { children: ReactNode }) => {
  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
};
