import { books } from "../data/books";

export function loadBooks(mode = "normal") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mode === "failure") {
        reject(new Error("Books could not be loaded. Please retry."));
        return;
      }

      if (mode === "empty") {
        resolve([]);
        return;
      }

      let savedStock = {};

      try {
        const raw = localStorage.getItem("campus-books-stock-v1");
        const parsed = raw ? JSON.parse(raw) : {};

        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          savedStock = parsed;
        }
      } catch {
        savedStock = {};
      }

      let result = books.map((book) => {
        const remaining = savedStock[book.id];

        const valid =
          Number.isInteger(remaining) &&
          remaining >= 0 &&
          remaining <= book.stock;

        return {
          ...book,
          stock: valid ? remaining : book.stock
        };
      });

      if (mode === "changed") {
        result = result.map((book) =>
          book.id === "b1"
            ? { ...book, stock: Math.min(book.stock, 1) }
            : book
        );
      }

      if (mode === "removed") {
        result = result.filter((book) => book.id !== "b1");
      }

      resolve(result);
    }, 600);
  });
}
