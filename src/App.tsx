import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <h1>Servo</h1>
      </main>
    </ThemeProvider>
  );
}

export default App;