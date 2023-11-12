import { gql, useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "./Home.module.css";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const movies = gql`
    query getMovies($page: Int!) {
      allMovies(page: $page) {
        id
        title
        poster_path
      }
    }
  `;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/page/${currentPage}`);
  };

  const pageNumbers = [];
  for (let i = 1; i <= 10; i++) {
    pageNumbers.push(i);
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
      navigate(`/page/${currentPage - 1}`);
    }
  };

  const nextPage = () => {
    if (currentPage < 10) {
      setCurrentPage((page) => page + 1);
      navigate(`/page/${currentPage + 1}`);
    }
  };

  const { data, loading, error } = useQuery(movies, {
    variables: { page: currentPage }, // 원하는 페이지 번호를 지정합니다.
  });

  if (loading) {
    return <strong>Loading..,</strong>;
  }

  if (error) {
    return <strong>Error : {error.message}</strong>;
  }

  return (
    <div className={style.container}>
      <div className={style.movies}>
        {data.allMovies.map((movie) => (
          <div key={movie.id} className={style.poster}>
            <Link to={`/movie/${movie.id}`}>
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
      <div className={style.paginate}>
        <ul className={style.paginate_list}>
          <li className={style.button} onClick={prevPage}>
            &larr;
          </li>
          {pageNumbers.length > 0 ? (
            pageNumbers.map((number) => (
              <li
                className={style.button}
                key={number}
                onClick={() => paginate(number)}
              >
                {number}
              </li>
            ))
          ) : (
            <div>{null}</div>
          )}
          <li className={style.button} onClick={nextPage}>
            &rarr;
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
