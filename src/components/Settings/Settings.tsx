import styles from "./Settings.module.css";
import { useTheme } from "../../hooks/use-theme";
import React from "react";
import { useState } from "react";

import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { get, ref } from "firebase/database";
import { db } from "../../firebase";
import PasswordSettings from "../PasswordSettings/PasswordSettings";

function Settings() {
  const { setTheme } = useTheme();
  const [userName, setName] = useState(null);
  const [userEmail, setEmail] = useState(null);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      const userId = user.uid;
      const userRef = ref(db, "users/" + userId);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setName(userData.username);
          setEmail(userData.email);
        }
      });
    }
  });

  return (
    <>
      <div className={styles.boxSettings}>
        <p className={styles.p}>Profile</p>
        <div className={styles.profileSettings}>
          <div className={styles.profileName}>
            <p>Name</p>
            <div className={styles.profileNameBox}>{userName}</div>
          </div>
          <div className={styles.profileEmail}>
            <p>Email</p>
            <div className={styles.profileEmailBox}>{userEmail}</div>
          </div>
        </div>
        <p className={styles.p}>Password</p>
        <div className={styles.passwordSettings}>
          <PasswordSettings />
        </div>
        <p className={styles.p}>Color mode</p>
        <div className={styles.colorModeSettings}>
          <div>
            <p>Dark</p>
            <p>Use dark theme </p>
          </div>
          <label className={styles.switch}>
            <input
              className={styles.switchInput}
              onClick={toggleTheme}
              type="checkbox"
            />
            <span className={styles.switchSlider}></span>
          </label>
        </div>
      </div>
    </>
  );
}

export default React.memo(Settings);
