import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./routes/Home.js"
import Movie from "./routes/Movie.js"
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/movies/:id' element={<Movie />}></Route>
      </Routes>
    </Router>
  )
}

export default App
