import styles from "./Home.module.css";
import { getApiResource } from "../../utils/network";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";
import { srcMovie } from "../../utils/network";
interface Films {
  Title: string;
  Poster: string;
  imdbID: string;
}
const Home = () => {
  const [films, setFilms] = useState<Films[]>();
  const [number, setNumber] = useState(1);
  const page = `&page=${number}`;

  const inputValue = useAppSelector((state) => state.input);
  const { text, years } = useAppSelector((state) => state.filters);
  const movie = `&s=${text}`;
  const src = srcMovie + movie + `&y=${years}` + page;
  const filteredFilms = films?.filter((film) => {
    return film.Title.toLowerCase().includes(inputValue.toLowerCase());
  });
  const getResourse = async (url: string) => {
    try {
      const data = await getApiResource(url);
      const filmsList: Films[] = data?.Search || [];
      if (films) {
        setFilms((prevFilms) => [...prevFilms, ...filmsList]);
      } else {
        setFilms(filmsList);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const showMoreBtn = () => {
    setNumber((prev) => prev + 1);
  };
  useEffect(() => {
    getResourse(src);
  }, [src]);

  return (
    <>
      <div key={`boxHome`} className={styles.boxHome}>
        <div className={styles.filterTextBox}>
          <p className={styles.filterText}>{text !== "movie" ? text : ""}</p>
          <p className={styles.filterText}>{years}</p>
        </div>
        <ul key={`listContainer`} className={styles.listContainer}>
          {filteredFilms?.map(({ Title, Poster, imdbID }) => (
            <li key={`${imdbID}`} className={styles.listItem}>
              <Link key={imdbID} to={`${imdbID}`}>
                <img className={styles.poster} src={Poster} alt="" />
                <p className={styles.pTitle}>{Title}</p>
                <p className={styles.pXz}>Animation, Adventure, Comedy</p>
              </Link>
            </li>
          ))}
        </ul>
        <div onClick={showMoreBtn} className={styles.showMoreBtn}>
          Show more
        </div>
      </div>
    </>
  );
};
export default Home;
