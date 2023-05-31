import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"

const getMovie = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`
function Movie() {
  const { id } = useParams()
  const { data, loading } = useQuery(getMovie, {
    variables: {
      movieId: id,
    },
  })
  if (loading) {
    return <h1>Looking for movie...</h1>
  }
  return <h1>{data.movie.title}</h1>
}

export default Movie
