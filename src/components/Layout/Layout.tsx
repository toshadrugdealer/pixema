import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
export function Layout() {
  return (
    <>
      <div className={styles.containerBar}>
        <div className={styles.boxBar}>
          <div className={styles.navBar}>
            <NavLink className={styles.home} to="/home">
              Home
            </NavLink>
            <NavLink className={styles.trends} to="/trends">
              Trends
            </NavLink>
            <NavLink className={styles.favorites} to="/favorites">
              Favorites
            </NavLink>
            <NavLink className={styles.settings} to="/settings">
              Settings
            </NavLink>
          </div>
          <p className={styles.p}>© All Rights Reserved</p>
        </div>
        <Outlet />
        <div className={styles.boxQwer}></div>
      </div>
    </>
  );
}
