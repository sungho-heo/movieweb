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
      isLiked @client
    }
  }
`;
function Movie() {
  const { id } = useParams();
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(getMovie, {
    variables: {
      movieId: id,
    },
    fetchPolicy: "cache-and-network",
  });
  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment ClickFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked,
      },
    });
  };
  // const array = data.movie.genres.map((a) => a.name);
  // console.log(...array);
  // console.log(data.movie.genres);
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
              <h1 className={style.title}>제목:{data.movie.title}</h1>
              <span>개봉일:{data.movie.release_date}</span>
              <div className={style.movieinfo}>{data.movie.overview}</div>
              <span>평점:{data.movie.vote_average}</span>
              <span>
                장르:
                {data.movie.genres.map((a, i) => {
                  const alpha = a.name;
                  if (i === data.movie.genres.length - 1) {
                    return alpha;
                  }
                  return alpha + ",";
                })}
              </span>
              <span className={style.icon} onClick={onClick}>
                {data.movie.isLiked ? (
                  <i className="fa-solid fa-thumbs-up"></i>
                ) : (
                  <i className="fa-regular fa-thumbs-up"></i>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movie;
