import styles from "./Settings.module.css";
import { useTheme } from "../../hooks/use-theme";
import React from "react";

function Settings() {
  const { setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <div className={styles.boxSettings}>
        <p className={styles.p}>Profile</p>
        <div className={styles.profileSettings}></div>
        <p className={styles.p}>Password</p>
        <div className={styles.passwordSettings}></div>
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
