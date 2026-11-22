import { Link, useLocation, useParams } from "react-router-dom";
import BookImage from "../components/BookImage";

export default function Details({ books, cart = [], onAdd }) {
  const { id } = useParams();
  const location = useLocation();
  const book = books.find((item) => item.id === id);

  if (!book) {
    return (
      <section className="panel">
        <h1>Book not found</h1>
        <p>This link is invalid, or the book is no longer available.</p>
        <Link to="/">Browse books</Link>
      </section>
    );
  }

  const quantity = cart.find((item) => item.id === id)?.quantity || 0;
  const limit = Math.min(5, book.stock);

  return (
    <>
      <Link to={location.state?.returnTo || "/"}>← Back to books</Link>

      <article className="details-layout panel">
        <BookImage key={book.id} book={book} />

        <div>
          <p className="eyebrow">{book.category} · {book.format}</p>
          <h1>{book.title}</h1>
          <p>By {book.author}</p>

          <p>
            {book.description || "A detailed description is not available yet."}
          </p>

          <p className="price">Rs. {book.price.toLocaleString()}</p>
          <p>{book.stock > 0 ? `${book.stock} available` : "Out of stock"}</p>
          <p>Maximum per order: {limit}. In your cart: {quantity}.</p>

          {book.format === "PDF" ? (
            <p>A PDF reader is required. Digital fulfilment is simulated.</p>
          ) : (
            <p>
              Delivery to Islamabad and Rawalpindi only.
              Delivery costs Rs. 200 below a printed subtotal of Rs. 3,000.
            </p>
          )}

          {onAdd && (
            <button
              onClick={() => onAdd(book.id)}
              disabled={book.stock === 0 || quantity >= limit}
            >
              {book.stock === 0
                ? "Unavailable"
                : quantity >= limit
                  ? "Quantity limit reached"
                  : "Add to cart"}
            </button>
          )}
        </div>
      </article>
    </>
  );
}
