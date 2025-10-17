export const colors = {
  // Brand - Evil Red
  primary: "#E31C25",
  primaryDark: "#C41E3A",
  primaryLight: "#FF3B47",

  // Dark Backgrounds (Deep blacks)
  background: "#000000", // Pure black (main background)
  card: "#0F0F0F", // Slightly lighter (cards)
  surface: "#1A1A1A", // Even lighter (elevated surfaces)

  // Text (High contrast on black)
  text: "#FFFFFF", // Pure white
  textSecondary: "#A0A0A0", // Gray (less important text)
  textTertiary: "#6B6B6B", // Darker gray (hints, placeholders)

  // Status
  success: "#00FF41", // Matrix green (approved)
  warning: "#FFA500", // Orange (pending)
  error: "#FF0000", // Bright red (rejected)

  // Borders/Dividers
  border: "#2A2A2A", // Subtle borders
  borderLight: "#1A1A1A", // Even more subtle
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: "#E31C25", // Red glow effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 36,
};

export const fontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  black: "900" as const,
};
