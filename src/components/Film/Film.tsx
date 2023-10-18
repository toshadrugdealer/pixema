import { useParams } from "react-router";
import styles from "./Film.module.css";
import { useEffect, useState } from "react";
import { getApiResource } from "../../utils/network";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/slices/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { srcTrends } from "../../utils/network";
import { Link } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, update, remove } from "firebase/database";
import { db } from "../../firebase";
interface FilmInfo {
  imdbID: string;
  Poster: string;
  Actors: string;
  Country: string;
  Released: string;
  Title: string;
  Rating: string;
  Genre: string;
  Runtime: string;
  Year: string;
  BoxOffice: string;
  Director: string;
  Writer: string;
  imdbRating: string;
}
interface films {
  Title: string;
  Poster: string;
  Genre: string;
  imdbID: string;
}
function Film() {
  const { id } = useParams<{ id: string }>();

  const [films12, setFilms12] = useState<films[]>();

  const [activeFilmIndex, setActiveFilmIndex] = useState(0);

  const [filmInfo, setFilmInfo] = useState<FilmInfo | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const filmId = `http://www.omdbapi.com/?i=${id}&apikey=73f13b04`;
  // список рекомендаций
  const getResourse = async (url: string) => {
    const body12 = Array(await getApiResource(url));
    const body2 = body12[0].Search;
    const filmsList12 = body2.map(({ Title, Poster, Genre, imdbID }: films) => {
      return {
        Title,
        Poster,
        Genre,
        imdbID,
      };
    });
    setFilms12(filmsList12);
  };
  useEffect(() => {
    getResourse(srcTrends);
  }, []);
  // список рекомендаций конец
  // кнопка добавления

  const favoriteFilms = useAppSelector((state) => state.favorites);
  const addToFavoritesHandler = (film: FilmInfo) => {
    dispatch(addToFavorites(film));
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const userId = user.uid;
        const userRef = ref(
          db,
          "users/" + userId + "/" + "favorites/" + film.imdbID
        );
        update(userRef, film).then();
      }
    });
  };
  const removeFromFavoritesHandler = (film: FilmInfo) => {
    dispatch(removeFromFavorites(film.imdbID));

    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const userId = user.uid;
        const userRef = ref(
          db,
          "users/" + userId + "/" + "favorites/" + film.imdbID
        );
        remove(userRef).then;
      }
    });
  };
  // кнопка добавления конец
  //  кнопки
  const moveLeft = () => {
    if (activeFilmIndex > 0) {
      setActiveFilmIndex(activeFilmIndex - 1);
      console.log(activeFilmIndex);
    }
  };

  const moveRight = () => {
    if (activeFilmIndex < films12.length - 1) {
      setActiveFilmIndex(activeFilmIndex + 1);
      console.log(activeFilmIndex);
    }
  };
  // конец кнопок
  useEffect(() => {
    (async () => {
      try {
        const res = await getApiResource(filmId);
        setFilmInfo(res);
        setLoading(false);
      } catch (error) {
        setError("Произошла ошибка при загрузке данных.");
        setLoading(false);
      }
    })();
  }, [filmId]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  if (!filmInfo) {
    return <p>Данные о фильме отсутствуют.</p>;
  }
  const isFavorite = favoriteFilms.some(
    (film) => film.imdbID === filmInfo.imdbID
  );

  return (
    <div className={styles.boxFilm}>
      <div key={"boxFilmPage"} className={styles.boxFilmPage}>
        <div key={"posterBtn"} className={styles.posterBtn}>
          <img key={"Poster"} src={filmInfo.Poster} alt="" />
          <button
            key={"btnAddRemove"}
            className={styles.btnAddRemove}
            onClick={() => {
              if (isFavorite) {
                removeFromFavoritesHandler(filmInfo);
              } else {
                addToFavoritesHandler(filmInfo);
              }
            }}
          >
            {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          </button>
        </div>
        <div className={styles.filmInfoText}>
          <p className={styles.genre}>{filmInfo.Genre}</p>
          <h1>{filmInfo.Title}</h1>
          <div className={styles.timeRating}>
            <div className={styles.imdbRating}>
              <h6>{filmInfo.imdbRating}</h6>
            </div>
            <div className={styles.runtime}>
              <h6>{filmInfo.Runtime}</h6>
            </div>
          </div>
          <p>Year: {filmInfo.Year}</p>
          <p>Released: {filmInfo.Released}</p>
          <p>BoxOffice: {filmInfo.BoxOffice}</p>
          <p>Country: {filmInfo.Country}</p>
          <p>Actors: {filmInfo.Actors}</p>
          <p>Director: {filmInfo.Director}</p>
          <p>Writer: {filmInfo.Writer}</p>
        </div>
      </div>
      <div className={styles.sliderRecomendation}>
        <div className={styles.btnRec}>
          <p className={styles.pRec}>Recommendations</p>
          <div>
            <button onClick={moveLeft}>&lt;</button>
            <button onClick={moveRight}>&gt;</button>
          </div>
        </div>
        <div>
          <div className={styles.boxTrends}>
            <ul
              key={"listContainer"}
              className={styles.listContainer}
              style={{
                transform: `translateX(-${activeFilmIndex * 286}px)`,
              }}
            >
              {films12?.map(({ Title, Poster, imdbID }) => (
                <Link
                  key={imdbID}
                  className={styles.favoriteFilms}
                  to={`/${imdbID}`}
                >
                  <li key={imdbID} className={styles.listItem}>
                    <img
                      key={Poster}
                      className={styles.poster}
                      src={Poster}
                      alt=""
                    />
                    <p key={Title}>{Title}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Film;
