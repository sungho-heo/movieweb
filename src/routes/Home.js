import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./Home.module.css";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const movies = gql`
    query getMovies($page: Int!) {
      allMovies(page: $page) {
        id
        title
        poster_path
      }
    }
  `;
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const { data, loading, error } = useQuery(movies, {
    variables: { page: 2 }, // 원하는 페이지 번호를 지정합니다.
  });
  if (loading) {
    return <strong>Loading..,</strong>;
  }
  if (error) {
    return <h1>Could not fetch</h1>;
  }
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.movie_title}>Movies</h1>
      </div>
      <div className={style.movies}>
        {data.allMovies.map((movie) => (
          <div key={movie.id} className={style.poster}>
            <Link to={`/movies/${movie.id}`}>
              <img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={style.img}
              />
            </Link>
          </div>
        ))}
      </div>
      <div>
        <ul>
          <li>prevPage</li>
          <li>nextPage</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
