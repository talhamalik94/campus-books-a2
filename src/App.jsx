import { Link, Route, Routes } from "react-router-dom";
import { books } from "./data/books";
import Catalog from "./pages/Catalog";
import Details from "./pages/Details";
import About from "./pages/About";

export default function App() {
  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <Link to="/">Books</Link>{" "}
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Catalog books={books} />} />
          <Route path="/books/:id" element={<Details books={books} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={
              <section>
                <h1>Page not found</h1>
                <Link to="/">Browse books</Link>
              </section>
            }
          />
        </Routes>
      </main>
    </>
  );
}
