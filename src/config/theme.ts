import { createTheme } from "@mui/material/styles";

// Define your custom theme
export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#0000", // Customize the primary color
    },
  },
  typography: {
    fontFamily: "Roboto", // Customize the default font family
  },
});
