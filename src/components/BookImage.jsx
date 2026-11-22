import { useState } from "react";

export default function BookImage({ book }) {
  const [failed, setFailed] = useState(false);

  if (!book.image || failed) {
    return <div className="book-image fallback">Cover unavailable</div>;
  }

  return (
    <img
      className="book-image"
      src={book.image}
      alt="Illustration of an open book"
      onError={() => setFailed(true)}
    />
  );
}
