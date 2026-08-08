import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {Routes, Route} from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { WorkOrders } from "./pages/WorkOrders";
import { WorkOrderDetails } from "./pages/WorkOrderDetails";
import { NotFound } from "./pages/NotFound";

/** Light-mode engineering color tokens mapped into the MUI palette. */
const colors = {
  primary: "#1748E8",
  primaryChange: "#155EEF",
  primaryTint: "#E8EDFF",
  primaryChangeTint: "#E9F0FF",
  ink: "#050A14",
  inkTint: "#F0F2F5",
  cyan: "#38BDF8",
  cyanDark: "#0369A1",
  cyanTint: "#E7F7FE",
  green: "#16A66A",
  greenDark: "#047857",
  greenTint: "#E7F7F0",
  amber: "#D9A514",
  amberDark: "#8A6500",
  amberTint: "#FFF7D6",
  orange: "#E86A0C",
  orangeDark: "#C2410C",
  orangeTint: "#FFF0E5",
  purple: "#7138E8",
  purpleTint: "#F0E9FD",
  surface: "#F5F5F5",
} as const;

function toColorVarName(key: string) {
  return `--color-${key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`;
}

const colorVars = {
  ...Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [toColorVarName(key), value]),
  ),
  "--color-surface-bg": `color-mix(in srgb, ${colors.surface} 28%, white)`,
} as const;

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary,
      dark: colors.primaryChange,
      light: colors.primaryTint,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: colors.ink,
      light: colors.inkTint,
      dark: colors.ink,
      contrastText: "#FFFFFF",
    },
    info: {
      main: colors.cyan,
      light: colors.cyanTint,
      dark: colors.cyanDark,
      contrastText: colors.ink,
    },
    success: {
      main: colors.green,
      light: colors.greenTint,
      dark: colors.greenDark,
      contrastText: "#FFFFFF",
    },
    warning: {
      main: colors.amber,
      light: colors.amberTint,
      dark: colors.amberDark,
      contrastText: colors.amberDark,
    },
    error: {
      main: colors.orange,
      light: colors.orangeTint,
      dark: colors.orangeDark,
      contrastText: "#FFFFFF",
    },
    purple: {
      main: colors.purple,
      light: colors.purpleTint,
      dark: colors.purple,
      contrastText: "#FFFFFF",
    },
    text: {
      primary: colors.ink,
    },
    background: {
      default: "var(--color-surface-bg)",
      paper: "#FFFFFF",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": colorVars,
        "h1.MuiTypography-root.MuiTypography-h4": {
          fontWeight: 600,
        },
        "h2.MuiTypography-root.MuiTypography-h6": {
          fontWeight: 600,
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            "@media (hover: hover)": {
              "&:hover": {
                backgroundColor: colors.primaryChangeTint,
                borderColor: colors.primaryChange,
                color: colors.primaryChange,
              },
            },
            "&:active": {
              backgroundColor: colors.primaryChangeTint,
              borderColor: colors.primaryChange,
              color: colors.primaryChange,
            },
          },
        },
        {
          props: { variant: "text", color: "primary" },
          style: {
            "@media (hover: hover)": {
              "&:hover": {
                backgroundColor: colors.primaryChangeTint,
                color: colors.primaryChange,
              },
            },
            "&:active": {
              backgroundColor: colors.primaryChangeTint,
              color: colors.primaryChange,
            },
          },
        },
      ],
    },
    MuiChip: {
      variants: [
        {
          props: { color: "default", variant: "filled" },
          style: {
            backgroundColor: colors.inkTint,
            color: colors.ink,
          },
        },
        {
          props: { color: "primary" },
          style: {
            backgroundColor: colors.primaryTint,
            color: colors.primary,
          },
        },
        {
          props: { color: "primary", variant: "outlined" },
          style: {
            backgroundColor: colors.primaryTint,
            color: colors.primary,
            borderColor: colors.primary,
          },
        },
        {
          props: { color: "info" },
          style: {
            backgroundColor: colors.cyanTint,
            color: colors.cyanDark,
          },
        },
        {
          props: { color: "info", variant: "outlined" },
          style: {
            backgroundColor: colors.cyanTint,
            color: colors.cyanDark,
            borderColor: colors.cyanDark,
          },
        },
        {
          props: { color: "purple" },
          style: {
            backgroundColor: colors.purpleTint,
            color: colors.purple,
          },
        },
        {
          props: { color: "purple", variant: "outlined" },
          style: {
            backgroundColor: colors.purpleTint,
            color: colors.purple,
            borderColor: colors.purple,
          },
        },
        {
          props: { color: "success" },
          style: {
            backgroundColor: colors.greenTint,
            color: colors.greenDark,
          },
        },
        {
          props: { color: "success", variant: "outlined" },
          style: {
            backgroundColor: colors.greenTint,
            color: colors.greenDark,
            borderColor: colors.greenDark,
          },
        },
        {
          props: { color: "warning" },
          style: {
            backgroundColor: colors.amberTint,
            color: colors.amberDark,
          },
        },
        {
          props: { color: "warning", variant: "outlined" },
          style: {
            backgroundColor: colors.amberTint,
            color: colors.amberDark,
            borderColor: colors.amberDark,
          },
        },
        {
          props: { color: "error" },
          style: {
            backgroundColor: colors.orangeTint,
            color: colors.orangeDark,
          },
        },
        {
          props: { color: "error", variant: "outlined" },
          style: {
            backgroundColor: colors.orangeTint,
            color: colors.orangeDark,
            borderColor: colors.orangeDark,
          },
        },
      ],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
          "&:focus": {
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: theme.zIndex.tooltip,
            width: "auto",
            height: "auto",
            margin: 0,
            padding: theme.spacing(1.5, 2),
            overflow: "visible",
            clip: "auto",
            whiteSpace: "normal",
            borderRadius: 1,
            backgroundColor: "background.paper",
            color: "primary.main",
            outline: `2px solid ${colors.primary}`,
            outlineOffset: 2,
            textDecoration: "none",
            typography: "body2",
            fontWeight: 500,
          },
        }}
      >
        Skip to main content
      </Box>
      <Box component="main" id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/work-orders" element={<WorkOrders />} />
          <Route path="/work-orders/:id" element={<WorkOrderDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
