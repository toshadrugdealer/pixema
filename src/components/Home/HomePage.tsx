import Header from "../header/Header.tsx";
import { Navigate, Route, Routes } from "react-router";
import { Layout } from "../Layout/Layout.tsx";
import Home from "./Home.tsx";
import { useAuth } from "../../hooks/use-auth.ts";
function HomePage() {
  const { isAuth } = useAuth();
  return isAuth ? (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
export default HomePage;
