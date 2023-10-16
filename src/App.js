import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home.js";
import Movie from "./routes/Movie.js";
import home from "./img/home.png";
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className={"header"}>
        <Link to={"/"}>
          <img className={"logo"} alt="home" src={home} />
        </Link>
        <h1 className={"movie_title"}>Top Movie</h1>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/page/:page" element={<Home />}></Route>
        <Route path="/movie/:id" element={<Movie />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
