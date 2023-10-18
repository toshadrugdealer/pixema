import styles from "./Trends.module.css";
import { getApiResource, srcTrends } from "../../utils/network";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
interface films {
  Title: string;
  Poster: string;
  Genre: string;
  imdbID: string;
}
const Trends = () => {
  const [films, setFilms] = useState<films[]>();
  const getResourse = async (url: string) => {
    const body1 = Array(await getApiResource(url));
    const body = body1[0].Search;
    const filmsList = body.map(({ Title, Poster, Genre, imdbID }: films) => {
      return {
        Title,
        Poster,
        Genre,
        imdbID,
      };
    });
    setFilms(filmsList);
  };
  useEffect(() => {
    getResourse(srcTrends);
  }, []);
  return (
    <>
      <div key={`boxTrends`} className={styles.boxTrends}>
        <ul key={`listContainer`} className={styles.listContainer}>
          {films?.map(({ Title, Poster, imdbID }) => (
            <li key={Title} className={styles.listItem}>
              <Link to={`/trends/${imdbID}`}>
                <img className={styles.poster} src={Poster} alt="" />
                <p className={styles.pTitle}>{Title}</p>
                <p className={styles.pXz}>Animation, Adventure, Comedy</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Trends;
