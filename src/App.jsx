import { books } from "./data/books";

export default function App() {
  return (
    <main>
      <h1>Campus Books</h1>
      <p>A fictional bookstore for students in Islamabad and Rawalpindi.</p>
      <p>All orders are simulated.</p>

      <h2>Our books</h2>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} — {book.format} — Rs. {book.price}
          </li>
        ))}
      </ul>
    </main>
  );
}
