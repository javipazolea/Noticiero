import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { esES, enUS } from "@mui/material/locale";
import NewsPage from "./pages/NewsPage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import FavoritesPage from "./pages/FavoritesPage";
import Navbar from "./components/navbar/Navbar";
import PaginaCategoria from "./pages/categorias/PaginaCategoria";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContext } from "./context/UserContext";

function App() {
  const { theme, language } = useContext(UserContext);

  // Crear tema dinámicamente basado en las preferencias del usuario
  const themeConfig = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: theme,
            primary: {
              main: "#1976d2",
            },
            secondary: {
              main: "#dc004e",
            },
            background: {
              default: theme === "light" ? "#f5f5f5" : "#303030",
              paper: theme === "light" ? "#ffffff" : "#424242",
            },
          },
          // Configuración de idioma para componentes MUI
        },
        language === "es" ? esES : enUS
      ),
    [theme, language]
  );

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<NewsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/categorias/:categoria" element={<PaginaCategoria />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
