import { createTheme } from "@mui/material/styles";

const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#E05C2A" },
    background: { default: "#F0F2F5", paper: "#1E2530" },
    text: { primary: "#F0F2F5", secondary: "#94A3B8" },
    divider: "#2D3748",
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: { fontFamily: '"Lora", Georgia, serif' },
    h2: { fontFamily: '"Lora", Georgia, serif' },
    h3: { fontFamily: '"Lora", Georgia, serif' },
    h4: { fontFamily: '"Lora", Georgia, serif' },
    h5: { fontFamily: '"Lora", Georgia, serif' },
    h6: { fontFamily: '"Lora", Georgia, serif' },
    button: { textTransform: "none" },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            borderLeft: "3px solid #F97316",
            backgroundColor: "rgba(249, 115, 22, 0.12)",
            "&:hover": {
              backgroundColor: "rgba(249, 115, 22, 0.18)",
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default appTheme;
