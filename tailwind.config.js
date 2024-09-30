module.exports = {
  content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        primary: "var(--primary)",
        "dark-primary": "var(--dark-primary)",
        text: "var(--text)",
        "dark-text": "var(--dark-text)",
        bg: "var(--bg)",
        "bg-color": "var(--bg-color)",
        "content-text": "var(--content-text)",
        footer: "var(--footer)",
        "border-color": "var(--border-color)",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
        custom: "var(--shadow)",
        "custom-low": "var(--shadow-low)",
      },
      backgroundImage: {
        "bg-img": "var(--bg-img)",
        gradient: "var(--gradient)",
      },
      borderRadius: {
        custom: "var(--border-radius)",
      },
      height: {
        "footer-height": "var(--footer-height)",
      },
      maxWidth: {
        "page-max": "var(--page-max-page)",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
};
