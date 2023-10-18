import { useState } from "react";
import "./BurgerMenu.css";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { removeUser } from "../../store/slices/userSlice";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";
import { db } from "../../firebase";

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const dispatch = useAppDispatch();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      const userId = user.uid;
      const userRef = ref(db, "users/" + userId);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserData(userData.username);
        }
      });
    }
  });
  function getFirstLetterName(userData: string | null) {
    if (userData && userData.length > 0) {
      return userData[0].toUpperCase();
    }
    return "";
  }
  const bukva = getFirstLetterName(userData);
  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`}>
      <div className="btnNameLogo">
        <div className="btnLogo">{bukva}</div>
        <button className="burger-icon" onClick={toggleMenu}>
          {userData}
        </button>
      </div>

      <ul className="menu-items">
        <li
          onClick={() => {
            dispatch(removeUser());
          }}
        >
          Remove
        </li>
      </ul>
    </div>
  );
}

export default BurgerMenu;
