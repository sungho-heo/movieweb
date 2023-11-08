import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import style from "./Movie.module.css";

const getMovie = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      poster_path
      overview
      genres {
        id
        name
      }
      release_date
      vote_average
    }
  }
`;
function Movie() {
  const { id } = useParams();
  const { data, loading } = useQuery(getMovie, {
    variables: {
      movieId: id,
    },
    fetchPolicy: "cache-and-network",
  });
  return (
    <div>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div className={style.movieDetail}>
          <div className={style.movieBox}>
            <img
              src={`https://image.tmdb.org/t/p/w500${data.movie.poster_path}`}
              alt={data.movie.title}
              className={style.img}
            />
            <div className={style.info}>
              <h1 className={style.title}>
                제목:{data.movie.title} ({data.movie.release_date.slice(0, 4)})
              </h1>
              <p>줄거리</p>
              <div className={style.movieinfo}>{data.movie.overview}</div>
              <span className={style.movieinfo}>
                평점:
                {Math.floor(data.movie.vote_average) === data.movie.vote_average
                  ? data.movie.vote_average
                  : data.movie.vote_average.toFixed(2)}
              </span>
              <span className={style.genres}>
                장르:
                {data.movie.genres.map((a, i) => {
                  const alpha = a.name;
                  if (i === data.movie.genres.length - 1) {
                    return alpha;
                  }
                  return alpha + ",";
                })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movie;
