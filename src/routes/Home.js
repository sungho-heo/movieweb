import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import style from "./Home.module.css"

function Home() {
  const movies = gql`
    query getMovies {
      allMovies {
        id
        title
        poster_path
      }
    }
  `
  const { data, loading, error } = useQuery(movies)
  if (loading) {
    return <strong>Loading..,</strong>
  }
  if (error) {
    return <h1>Could not fetch</h1>
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
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
