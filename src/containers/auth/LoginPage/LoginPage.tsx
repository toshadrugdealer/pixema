import Form from "../Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../../store/slices/userSlice";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../hooks/redux-hooks";

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            token: user.refreshToken,
            email: user.email,
            id: user.uid,
          })
        );
        navigate("/home");
      })
      .catch(() => alert("неверный логин или пароль"));
  };
  return (
    <>
      <Form
        container="container1"
        displayNone="boxNone"
        title="Sign In"
        titleh4="Don’t have an account? "
        titleLink="/register"
        titleLinkText="Sing Un"
        handleClick={handleLogin}
      />
    </>
  );
}
export default LoginPage;
