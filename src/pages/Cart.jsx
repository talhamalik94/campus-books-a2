import { Link } from "react-router-dom";
import Summary from "../components/Summary";
import {
  MAX_PER_TITLE,
  checkQuantity,
  getCartProblems,
  getTotals
} from "../utils/rules";

export default function Cart({ books, cart, onChange, onRemove }) {
  const problems = getCartProblems(cart, books);
  const totals = getTotals(cart, books);

  if (cart.length === 0) {
    return (
      <section className="panel">
        <h1>Your cart is empty</h1>
        <p>Choose a book to start your order.</p>
        <Link className="button" to="/">Browse books</Link>
      </section>
    );
  }

  return (
    <>
      <h1>Your cart</h1>

      {problems.length > 0 && (
        <div className="alert" role="alert">
          <h2>Your selection needs attention</h2>

          <ul>
            {problems.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>

          <p>The summary is provisional until these issues are corrected.</p>
        </div>
      )}

      <div className="two-column">
        <section aria-label="Selected books">
          {cart.map((item) => {
            const book = books.find((book) => book.id === item.id);

            if (!book) {
              return (
                <article className="panel" key={item.id}>
                  <h2>Unavailable book: {item.id}</h2>
                  <p>This saved item is no longer in the catalogue.</p>
                  <button onClick={() => onRemove(item.id)}>
                    Remove unavailable book
                  </button>
                </article>
              );
            }

            const limit = Math.min(MAX_PER_TITLE, book.stock);
            const error = checkQuantity(item.quantity, book.stock);

            return (
              <article className="panel" key={item.id}>
                <h2>
                  <Link to={`/books/${book.id}`}>{book.title}</Link>
                </h2>

                <p>{book.format} · Rs. {book.price.toLocaleString()} each</p>
                <p>{book.stock} available · Maximum {limit} per order</p>

                <div className="actions">
                  <button
                    className="secondary"
                    aria-label={`Decrease quantity of ${book.title}`}
                    disabled={item.quantity <= 1 || Boolean(error)}
                    onClick={() => onChange(item.id, item.quantity - 1)}
                  >
                    −
                  </button>

                  <span aria-live="polite">Quantity: {item.quantity}</span>

                  <button
                    className="secondary"
                    aria-label={`Increase quantity of ${book.title}`}
                    disabled={item.quantity >= limit || Boolean(error)}
                    onClick={() => onChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>

                  <button
                    className="secondary"
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>

                {error && (
                  <div>
                    <p className="error">{error}</p>

                    {limit > 0 && (
                      <button onClick={() => onChange(item.id, limit)}>
                        Use available quantity: {limit}
                      </button>
                    )}
                  </div>
                )}

                <p>
                  Line total: Rs. {(book.price * item.quantity).toLocaleString()}
                </p>
              </article>
            );
          })}
        </section>

        <aside>
          <Summary totals={totals} />

          {problems.length === 0 ? (
            <Link className="button" to="/checkout">
              Continue to checkout
            </Link>
          ) : (
            <p className="error">Correct your cart before continuing.</p>
          )}

          <p><Link to="/">Continue browsing</Link></p>
        </aside>
      </div>
    </>
  );
}
