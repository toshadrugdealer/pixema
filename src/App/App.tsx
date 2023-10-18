import { Route, Routes } from "react-router";
import LoginPage from "../containers/auth/LoginPage/LoginPage.tsx";
import RegisterPage from "../containers/auth/RegisterPage/RegisterPage.tsx";
import HomePage from "../components/Home/HomePage.tsx";
import TrendsPage from "../components/Trends/TrendsPage.tsx";
import FavoritesPage from "../components/Favorites/FavoritesPage.tsx";
import SettingsPage from "../components/Settings/SettingsPage.tsx";
import ErrorPage from "../components/Error/ErrorPage.tsx";
import FilmPage from "../components/Film/FilmPage.tsx";
import { useTheme } from "../hooks/use-theme.ts";

function App() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:id" element={<FilmPage />} />
        <Route path="/trends" element={<TrendsPage />} />
        <Route path="/trends/:id" element={<FilmPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/favorites/:id" element={<FilmPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
