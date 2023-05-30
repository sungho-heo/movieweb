import { useApolloClient, gql } from "@apollo/client"
import { useEffect, useState } from "react"

function Home() {
  const [movies, setMoives] = useState([])
  const client = useApolloClient()
  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              id
              title
            }
          }
        `,
      })
      .then((result) => setMoives(result.data.allMovies))
  }, [client])
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  )
}

export default Home
