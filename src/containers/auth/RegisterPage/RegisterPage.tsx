import { useDispatch } from "react-redux";
import { ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from "../Form";
import { setUser } from "../../../store/slices/userSlice";
import { useNavigate } from "react-router";
import { db } from "../../../firebase";
function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = (email: string, password: string, name: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            name: name,
            token: user.refreshToken,
            email: user.email,
            id: user.uid,
          })
        );
        const userRef = ref(db, `users/${user.uid}`);
        set(userRef, {
          username: name,
          email: user.email,
        });
        navigate("/login");
      })
      .catch(console.error);
  };
  return (
    <>
      <Form
        container="containerReg"
        title="Sign Up"
        titleh4="Already have an account? "
        titleLink="/login"
        titleLinkText="Sing In"
        handleClick={handleRegister}
      />
    </>
  );
}
export default RegisterPage;
