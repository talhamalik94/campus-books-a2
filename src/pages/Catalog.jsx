import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";

export default function Catalog({ books, cart = [], onAdd }) {
  const [params, setParams] = useSearchParams();

  const search = params.get("q") || "";
  const category = params.get("category") || "All";
  const sort = params.get("sort") || "title";
  const inStock = params.get("stock") === "yes";

  function changeFilter(name, value) {
    const next = new URLSearchParams(params);

    if (value) {
      next.set(name, value);
    } else {
      next.delete(name);
    }

    setParams(next, { replace: true });
  }

  const categories = [...new Set(books.map((book) => book.category))];

  const results = books
    .filter((book) => {
      const text = `${book.title} ${book.author} ${book.category}`.toLowerCase();

      return (
        text.includes(search.trim().toLowerCase()) &&
        (category === "All" || book.category === category) &&
        (!inStock || book.stock > 0)
      );
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return a.title.localeCompare(b.title);
    });

  const returnTo = `/?${params.toString()}`;

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Made for student life</p>
        <h1>Your next chapter starts here.</h1>
        <p>Compare formats, check availability and choose books at your pace.</p>
        <p>
          Printed delivery: Rs. 200, or free when the printed subtotal
          reaches Rs. 3,000.
        </p>
        <p>
          PDF-only orders have no delivery fee.
          Maximum five copies per title, subject to stock.
        </p>
      </section>

      <section aria-labelledby="browse-heading">
        <h2 id="browse-heading">Browse books</h2>

        <div className="filters">
          <label>
            Search books
            <input
              type="search"
              value={search}
              placeholder="Title, author or category"
              onChange={(event) => changeFilter("q", event.target.value)}
            />
          </label>

          <label>
            Category
            <select
              value={category}
              onChange={(event) => changeFilter("category", event.target.value)}
            >
              <option value="All">All categories</option>
              {categories.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>

          <label>
            Sort by
            <select
              value={sort}
              onChange={(event) => changeFilter("sort", event.target.value)}
            >
              <option value="title">Title A–Z</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>

          <label className="check">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(event) =>
                changeFilter("stock", event.target.checked ? "yes" : "")
              }
            />
            In stock only
          </label>

          <button className="secondary" onClick={() => setParams({})}>
            Clear filters
          </button>
        </div>

        <p role="status">{results.length} books found</p>

        {books.length === 0 ? (
          <div className="panel">
            <h3>The catalogue is currently empty</h3>
            <p>
              Please try again later. In demonstration mode,
              choose “Normal data”.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="panel">
            <h3>No matching books</h3>
            <p>
              Try a shorter search or remove a filter.
              Your cart has not changed.
            </p>
            <button onClick={() => setParams({})}>Show all books</button>
          </div>
        ) : (
          <div className="grid">
            {results.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                quantity={cart.find((item) => item.id === book.id)?.quantity || 0}
                onAdd={onAdd}
                returnTo={returnTo}
              />
            ))}
          </div>
        )}
      </section>

      <details className="panel offers">
        <summary>Optional: view student offers</summary>
        <p>Printed orders of Rs. 3,000 or more qualify for free delivery.</p>
        <p>No subscription or email signup is required.</p>
      </details>
    </>
  );
}
