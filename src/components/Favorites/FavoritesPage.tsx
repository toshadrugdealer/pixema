import Header from "../header/Header.tsx";
import { Navigate, Route, Routes } from "react-router";
import { Layout } from "../Layout/Layout.tsx";
import Favorites from "./Favorites.tsx";
import { useAuth } from "../../hooks/use-auth.ts";
function FavoritesPage() {
  const { isAuth } = useAuth();
  return isAuth ? (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Favorites />} />
          </Route>
        </Route>
      </Routes>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
export default FavoritesPage;
