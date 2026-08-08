import Header from "./Components/Header.jsx";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./contexs/themecontex.jsx";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
