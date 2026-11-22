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

      let result = books.map((book) => ({ ...book }));

      if (mode === "changed") {
        result = result.map((book) =>
          book.id === "b1" ? { ...book, stock: 1 } : book
        );
      }

      if (mode === "removed") {
        result = result.filter((book) => book.id !== "b1");
      }

      resolve(result);
    }, 600);
  });
}
