import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"

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
    <div>
      <h1>Movies</h1>
      <div>
        {data.allMovies.map((movie) => (
          <Link to={`/movies/${movie.id}`}>
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width='200px'
              height='200px'
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
