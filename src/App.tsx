import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Routes, Route} from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { WorkOrders } from "./pages/WorkOrders";
import { WorkOrderDetails } from "./pages/WorkOrderDetails";
import { NotFound } from "./pages/NotFound";



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
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/work-orders" element={<WorkOrders />} />
      <Route path="/work-orders/:id" element={<WorkOrderDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;