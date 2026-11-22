export const CART_KEY = "campus-books-cart-v1";

export function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);

    if (!raw) {
      return { cart: [], message: "" };
    }

    const cart = JSON.parse(raw);

    const valid =
      Array.isArray(cart) &&
      cart.length <= 100 &&
      cart.every(
        (item) =>
          item &&
          typeof item.id === "string" &&
          item.id.length > 0 &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0 &&
          item.quantity <= 999
      ) &&
      new Set(cart.map((item) => item.id)).size === cart.length;

    if (!valid) {
      throw new Error("Invalid saved cart");
    }

    return {
      cart,
      message: cart.length > 0 ? "Your saved cart has been restored." : ""
    };
  } catch {
    return {
      cart: [],
      message: "The saved cart could not be read. A new empty cart was started."
    };
  }
}
