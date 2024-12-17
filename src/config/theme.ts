import { createTheme } from "@mui/material/styles";

// Define your custom theme
export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#9E7A7A", // Customize the primary color
    },
    secondary: {
      main: "#FCFAF2", // Customize the secondary color
    },
  },
  typography: {
    fontFamily: "Roboto", // Customize the default font family
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&.Mui-disabled": {
            cursor: "not-allowed",
            pointerEvents: "auto",
          },
        },
      },
    },
  },
});
