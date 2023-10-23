import { Outlet } from "react-router";
import styles from "./Header.module.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useState, ChangeEvent } from "react";
import { setInputValue } from "../../store/slices/inputSlice";
import { useAppDispatch } from "../../hooks/redux-hooks";
import BtnBurger from "../BtnButger/BtnBurger";

function Header() {
  const [InputValueLocal, setInputValueLocal] = useState<string>("");
  const dispatch = useAppDispatch();
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValueLocal(newValue);
    dispatch(setInputValue(newValue));
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span>pix</span>ema
        </div>
        <div className={styles.searchInputAndBtn}>
          <input
            className={styles.input}
            type="text"
            value={InputValueLocal}
            onChange={handleSearchInputChange}
            placeholder="Search"
          />
          <BtnBurger />
        </div>

        <BurgerMenu />
      </div>
      <Outlet />
    </>
  );
}
export default Header;
