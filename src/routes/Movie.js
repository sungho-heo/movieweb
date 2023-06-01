import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"

const getMovie = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      poster_path
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
        <div>
          <h1>{data.movie.title}</h1>
          <button onClick={onClick}>
            {data.movie.isLiked ? "Unlike" : "Like"}
          </button>
        </div>
      )}
    </div>
  )
}

export default Movie
