import { Link } from "react-router-dom";
import styles from "./Error.module.css";
function Error() {
  return (
    <>
      <h1 className={styles.h1}>
        Такой страницы не существует. Перейти на<Link to="/home">главную</Link>
      </h1>
    </>
  );
}
export default Error;
