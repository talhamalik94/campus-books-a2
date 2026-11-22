import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation
} from "react-router-dom";

import Catalog from "./pages/Catalog";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import About from "./pages/About";

import { loadBooks } from "./services/loadBooks";
import { CART_KEY, readCart } from "./utils/storage";
import {
  checkQuantity,
  getTotals,
  validateCheckout
} from "./utils/rules";

export default function App() {
  const [saved] = useState(readCart);
  const [cart, setCart] = useState(saved.cart);
  const [message, setMessage] = useState(saved.message);
  const [storageError, setStorageError] = useState("");

  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [loadError, setLoadError] = useState("");
  const [request, setRequest] = useState({
    mode: "normal",
    attempt: 0
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    address: "",
    pdfReady: false
  });

  const [order, setOrder] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    async function fetchBooks() {
      try {
        const result = await loadBooks(request.mode);

        if (!cancelled) {
          setBooks(result);
          setStatus("ready");
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(error.message);
          setStatus("error");
        }
      }
    }

    fetchBooks();

    return () => {
      cancelled = true;
    };
  }, [request]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      setStorageError("");
    } catch {
      setStorageError(
        "Your browser could not save the cart. It still works until you leave."
      );
    }
  }, [cart]);

  useEffect(() => {
    document.getElementById("main-content")?.focus();
  }, [location.pathname]);

  function reloadBooks(mode) {
    setStatus("loading");
    setLoadError("");

    setRequest((previous) => ({
      mode,
      attempt: previous.attempt + 1
    }));
  }

  function addBook(id) {
    const book = books.find((book) => book.id === id);

    if (!book) {
      setMessage("This book is no longer available.");
      return;
    }

    const quantity =
      cart.find((item) => item.id === id)?.quantity || 0;

    const error = checkQuantity(quantity + 1, book.stock);

    if (error) {
      setMessage(error);
      return;
    }

    setCart((previous) => {
      const exists = previous.some((item) => item.id === id);

      if (exists) {
        return previous.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { id, quantity: 1 }];
    });

    setMessage(`${book.title} added to your cart.`);
  }

  function changeQuantity(id, quantity) {
    const book = books.find((book) => book.id === id);

    if (!book) return;

    const error = checkQuantity(quantity, book.stock);

    if (error) {
      setMessage(error);
      return;
    }

    setCart((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );

    setMessage("Cart quantity updated.");
  }

  function removeBook(id) {
    setCart((previous) =>
      previous.filter((item) => item.id !== id)
    );

    setMessage("Book removed from your cart.");
  }

  function changeForm(name, value) {
    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function confirmOrder() {
    const errors = validateCheckout(form, cart, books);

    if (status !== "ready" || Object.keys(errors).length > 0) {
      return false;
    }

    const items = cart.map((item) => {
      const book = books.find((book) => book.id === item.id);

      return {
        id: book.id,
        title: book.title,
        format: book.format,
        price: book.price,
        quantity: item.quantity
      };
    });

    setOrder({
      id: `DEMO-${Date.now()}`,
      items,
      city: form.city,
      totals: getTotals(cart, books)
    });

    setCart([]);

    setForm({
      name: "",
      email: "",
      city: "",
      address: "",
      pdfReady: false
    });

    setMessage("Simulated order completed.");

    return true;
  }

  const count = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="site-header">
        <Link to="/" className="brand">
          Campus Books
          <span>Read. Learn. Repeat.</span>
        </Link>

        <nav aria-label="Main navigation">
          <NavLink to="/" end>Books</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/cart">Cart ({count})</NavLink>
        </nav>
      </header>

      <div className="notice">
        Student project · All orders are simulated
      </div>

      <main id="main-content" tabIndex="-1">
        <p className="feedback" role="status">{message}</p>

        {storageError && (
          <p className="alert" role="alert">{storageError}</p>
        )}

        {status === "loading" ? (
          <section className="panel" role="status">
            <h1>Loading books…</h1>
            <p>Your cart is kept while the catalogue loads.</p>
          </section>
        ) : status === "error" ? (
          <section className="panel" role="alert">
            <h1>Unable to load books</h1>
            <p>{loadError}</p>
            <button onClick={() => reloadBooks("normal")}>
              Retry loading
            </button>
          </section>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Catalog
                  books={books}
                  cart={cart}
                  onAdd={addBook}
                />
              }
            />

            <Route
              path="/books/:id"
              element={
                <Details
                  books={books}
                  cart={cart}
                  onAdd={addBook}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <Cart
                  books={books}
                  cart={cart}
                  onChange={changeQuantity}
                  onRemove={removeBook}
                />
              }
            />

            <Route
              path="/checkout"
              element={
                <Checkout
                  books={books}
                  cart={cart}
                  form={form}
                  onFormChange={changeForm}
                  onConfirm={confirmOrder}
                />
              }
            />

            <Route
              path="/confirmation"
              element={<Confirmation order={order} />}
            />

            <Route path="/about" element={<About />} />

            <Route
              path="*"
              element={
                <section className="panel">
                  <h1>Page not found</h1>
                  <p>
                    The address does not match a page on this website.
                  </p>
                  <Link to="/">Return to books</Link>
                </section>
              }
            />
          </Routes>
        )}

        <details className="panel demo">
          <summary>Assignment demonstration controls</summary>

          <p>
            These controls simulate catalogue conditions.
            They do not clear your cart.
          </p>

          <div className="actions">
            <button
              className="secondary"
              onClick={() => reloadBooks("normal")}
            >
              Normal data
            </button>

            <button
              className="secondary"
              onClick={() => reloadBooks("failure")}
            >
              Loading failure
            </button>

            <button
              className="secondary"
              onClick={() => reloadBooks("empty")}
            >
              Empty dataset
            </button>

            <button
              className="secondary"
              onClick={() => reloadBooks("changed")}
            >
              Reduce b1 stock to 1
            </button>

            <button
              className="secondary"
              onClick={() => reloadBooks("removed")}
            >
              Remove b1 from catalogue
            </button>
          </div>

          <p>
            Current data mode: {request.mode}.
            Refresh starts with normal data.
          </p>
        </details>
      </main>

      <footer>
        <p>
          Campus Books · Fictional bookstore · Islamabad & Rawalpindi
        </p>
        <p>No real payments, deliveries or digital downloads.</p>
      </footer>
    </>
  );
}
