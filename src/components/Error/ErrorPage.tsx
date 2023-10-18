import Header from "../header/Header.tsx";
import { Navigate, Route, Routes } from "react-router";
import { Layout } from "../Layout/Layout.tsx";
import Error from "./Error.tsx";
import { useAuth } from "../../hooks/use-auth.ts";
function ErrorPage() {
  const { isAuth } = useAuth();
  return isAuth ? (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route element={<Layout />}>
            <Route path="*" element={<Error />} />
          </Route>
        </Route>
      </Routes>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
export default ErrorPage;
