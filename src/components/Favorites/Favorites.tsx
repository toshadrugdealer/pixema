import { useAppSelector } from "../../hooks/redux-hooks";
import { Link } from "react-router-dom";
import styles from "./Favorites.module.css";
import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";
import { db } from "../../firebase";

function Favorites() {
  const favoriteFilms = useAppSelector((state) => state.favorites);
  const [userData, setUserData] = useState();
  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const userId = user.uid;
        const userRef = ref(db, "users/" + userId);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserData(userData);
          }
        });
      }
    });
  }, []);

  return (
    <div className={styles.favoritesBox}>
      <h2>
        {favoriteFilms.length
          ? "Избранные фильмы"
          : "Список избранных фильмов пуст"}
      </h2>
      <ul className={styles.listContainer}>
        {favoriteFilms.map((film) => (
          <li key={film.imdbID} className={styles.listItem}>
            <Link className={styles.favoriteFilms} to={`${film.imdbID}`}>
              <img
                key={film.Poster}
                className={styles.poster}
                src={film.Poster}
                alt=""
              />
              <p className={styles.pTitle} key={film.Title}>
                {film.Title}
              </p>
              <p className={styles.pXz}>Animation, Adventure, Comedy</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
