import { useState, ChangeEvent, useRef } from "react";
import "./BtnBurger.css";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { saveFilters } from "../../store/slices/filtersSlice";

const BtnBurger = () => {
  let [text, setText] = useState("movie");
  const [years, setYears] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const resetFilters = () => {
    setText("movie");
    setYears("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };
  const showResultes = () => {
    if (text == "") text = "movie";
    dispatch(saveFilters({ text, years }));
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  const handleSearchInputChangeYears = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const yearsValue = event.target.value;
    setYears(yearsValue);
  };
  const handleSearchInputChangeText = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const textValue = event.target.value;
    setText(textValue);
  };

  return (
    <div className={`burger ${isOpen ? "open" : ""}`}>
      <button className="btnBurger" onClick={toggleMenu}>
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
      </button>
      <ul className="menuList">
        <div className="filtersLogo">
          <p className="filtersP">Filters</p>
          <button onClick={closeMenu}>x</button>
        </div>
        <div className={`menu-item ${isOpen ? "open" : ""}`}>
          <div className="filterMenu">
            <div>
              <p className="filtersP">Full or short movie name</p>
              <input
                onChange={handleSearchInputChangeText}
                type="text"
                placeholder="Your text"
                ref={textInputRef}
              />
            </div>
            <div>
              <p className="filtersP">Years</p>
              <div className="yearsInput">
                <input
                  onChange={handleSearchInputChangeYears}
                  type="number"
                  placeholder="Years"
                  value={years}
                />
              </div>
            </div>
          </div>
          <div className="showClerBtn">
            <button className="clearBtn" onClick={resetFilters}>
              Clear filter
            </button>
            <button className="showBtn" onClick={showResultes}>
              Show resultes
            </button>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default BtnBurger;
