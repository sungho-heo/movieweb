import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"

function Home() {
  const movies = gql`
    query getMovies {
      allMovies {
        id
        title
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
    <ul>
      {data.allMovies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Home
