export const MAX_PER_TITLE = 5;
export const DELIVERY_FEE = 200;
export const FREE_DELIVERY_AT = 3000;

export function checkQuantity(quantity, stock) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    return "Quantity must be a whole number of at least 1.";
  }

  if (!Number.isInteger(stock) || stock < 1) {
    return "This book is currently unavailable.";
  }

  const limit = Math.min(MAX_PER_TITLE, stock);

  if (quantity > limit) {
    return `Only ${limit} copies can be ordered for this title.`;
  }

  return "";
}

export function getCartProblems(cart, books) {
  const problems = [];

  cart.forEach((item) => {
    const book = books.find((book) => book.id === item.id);

    if (!book) {
      problems.push(`Book ${item.id} is no longer available. Remove it from your cart.`);
      return;
    }

    const error = checkQuantity(item.quantity, book.stock);

    if (error) {
      problems.push(`${book.title}: ${error}`);
    }
  });

  return problems;
}

export function getTotals(cart, books) {
  let count = 0;
  let subtotal = 0;
  let printedSubtotal = 0;
  let hasPrinted = false;
  let hasPdf = false;

  cart.forEach((item) => {
    const book = books.find((book) => book.id === item.id);

    if (!book) return;

    const lineTotal = book.price * item.quantity;

    count += item.quantity;
    subtotal += lineTotal;

    if (book.format === "PDF") {
      hasPdf = true;
    } else {
      hasPrinted = true;
      printedSubtotal += lineTotal;
    }
  });

  const delivery =
    hasPrinted && printedSubtotal < FREE_DELIVERY_AT ? DELIVERY_FEE : 0;

  return {
    count,
    subtotal,
    printedSubtotal,
    delivery,
    total: subtotal + delivery,
    hasPrinted,
    hasPdf
  };
}

export function validateCheckout(form, cart, books) {
  const errors = {};
  const totals = getTotals(cart, books);
  const problems = getCartProblems(cart, books);

  if (cart.length === 0) {
    errors.cart = "Add at least one book before confirming.";
  } else if (problems.length > 0) {
    errors.cart = "Correct unavailable books or invalid quantities in your cart.";
  }

  if (form.name.trim().length < 2) {
    errors.name = "Enter a name with at least two characters.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter an email such as student@example.com.";
  }

  if (totals.hasPrinted) {
    if (!["Islamabad", "Rawalpindi"].includes(form.city)) {
      errors.city = "Printed delivery is available only in Islamabad or Rawalpindi.";
    }

    if (form.address.trim().length < 10) {
      errors.address = "Enter a delivery address with at least ten characters.";
    }
  }

  if (totals.hasPdf && !form.pdfReady) {
    errors.pdfReady = "Confirm that you can open PDF files before ordering a PDF.";
  }

  return errors;
}
