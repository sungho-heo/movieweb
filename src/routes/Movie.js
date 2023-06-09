import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import style from "./Movie.module.css"

const getMovie = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      poster_path
      overview
      release_date
      vote_average
      isLiked @client
    }
  }
`
function Movie() {
  const { id } = useParams()
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(getMovie, {
    variables: {
      movieId: id,
    },
    fetchPolicy: "cache-and-network",
  })
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
    })
  }
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
            <div className={style.movieinfo}>{data.movie.overview}</div>
            <div className={style.info}>
              <h1 className={style.title}>{data.movie.title}</h1>
              <span className={style.icon} onClick={onClick}>
                {data.movie.isLiked ? (
                  <i className='fa-solid fa-thumbs-up'></i>
                ) : (
                  <i className='fa-regular fa-thumbs-up'></i>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Movie
