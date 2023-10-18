import Header from "../header/Header.tsx";
import { Navigate, Route, Routes } from "react-router";
import { Layout } from "../Layout/Layout.tsx";
import { useAuth } from "../../hooks/use-auth.ts";
import Film from "./Film.tsx";
function FilmPage() {
  const { isAuth } = useAuth();
  return isAuth ? (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Film />} />
          </Route>
        </Route>
      </Routes>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
export default FilmPage;
