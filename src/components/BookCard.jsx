import { Link } from "react-router-dom";
import BookImage from "./BookImage";

export default function BookCard({ book, quantity = 0, onAdd, returnTo }) {
  return (
    <article className="card">
      <BookImage book={book} />

      <div className="card-body">
        <p className="eyebrow">{book.category} · {book.format}</p>

        <h2>
          <Link to={`/books/${book.id}`} state={{ returnTo }}>
            {book.title}
          </Link>
        </h2>

        <p>{book.author}</p>
        <p className="price">Rs. {book.price.toLocaleString()}</p>

        <p className={book.stock > 0 ? "available" : "error"}>
          {book.stock > 0 ? `${book.stock} available` : "Out of stock"}
        </p>

        <p>In your cart: {quantity}</p>

        {onAdd && (
          <button
            onClick={() => onAdd(book.id)}
            disabled={book.stock === 0 || quantity >= Math.min(5, book.stock)}
          >
            {book.stock === 0
              ? "Unavailable"
              : quantity >= Math.min(5, book.stock)
                ? "Quantity limit reached"
                : "Add to cart"}
          </button>
        )}
      </div>
    </article>
  );
}
