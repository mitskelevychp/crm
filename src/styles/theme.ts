import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00b1d0",
      // light: will be calculated from palette.primary.main,
      dark: "#00869b",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#184d92",
      light: "#337fdd",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    h1: {
      fontSize: 20,
      color: "#184d93",
      fontWeight: 700,
    },
    body1: {
      fontWeight: 500,
    },
  },
  // components: {
  //   MuiAutocomplete: {
  //     styleOverrides: {
  //       paper: {
  //         backgroundColor: "lightblue",
  //       },
  //     },
  //   },
  // },
});

export default theme;
