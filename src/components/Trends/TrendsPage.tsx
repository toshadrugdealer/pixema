import Header from "../header/Header.tsx";
import { Navigate, Route, Routes } from "react-router";
import { Layout } from "../Layout/Layout.tsx";
import Trends from "./Trends.tsx";
import { useAuth } from "../../hooks/use-auth.ts";
function TrendsPage() {
  const { isAuth } = useAuth();
  return isAuth ? (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Trends />} />
          </Route>
        </Route>
      </Routes>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
export default TrendsPage;
