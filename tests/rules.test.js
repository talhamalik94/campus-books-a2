import test from "node:test";
import assert from "node:assert/strict";

import {
  checkQuantity,
  getTotals,
  validateCheckout
} from "../src/utils/rules.js";

test("accepts an ordinary valid quantity", () => {
  assert.equal(checkQuantity(2, 8), "");
});

test("accepts exactly five copies when stock allows", () => {
  assert.equal(checkQuantity(5, 8), "");
});

test("rejects quantities above the five-copy limit", () => {
  assert.equal(
    checkQuantity(6, 8),
    "Only 5 copies can be ordered for this title."
  );
});

test("rejects quantities above available stock", () => {
  assert.equal(
    checkQuantity(3, 2),
    "Only 2 copies can be ordered for this title."
  );
});

test("rejects unavailable books", () => {
  assert.equal(
    checkQuantity(1, 0),
    "This book is currently unavailable."
  );
});

test("rejects fractional quantities", () => {
  assert.equal(
    checkQuantity(1.5, 8),
    "Quantity must be a whole number of at least 1."
  );
});

test("rejects zero copies", () => {
  assert.equal(
    checkQuantity(0, 8),
    "Quantity must be a whole number of at least 1."
  );
});

test("charges delivery below the free-delivery boundary", () => {
  const books = [{ id: "p", price: 2999, format: "Paperback" }];
  const cart = [{ id: "p", quantity: 1 }];

  assert.equal(getTotals(cart, books).delivery, 200);
});

test("delivery is free exactly at the boundary", () => {
  const books = [{ id: "p", price: 3000, format: "Paperback" }];
  const cart = [{ id: "p", quantity: 1 }];

  assert.equal(getTotals(cart, books).delivery, 0);
});

test("PDF-only orders have no delivery charge", () => {
  const books = [{ id: "d", price: 600, format: "PDF" }];
  const cart = [{ id: "d", quantity: 1 }];

  assert.equal(getTotals(cart, books).delivery, 0);
});

test("PDF prices do not count towards free printed delivery", () => {
  const books = [
    { id: "p", price: 1000, format: "Paperback" },
    { id: "d", price: 2500, format: "PDF" }
  ];

  const cart = [
    { id: "p", quantity: 1 },
    { id: "d", quantity: 1 }
  ];

  const totals = getTotals(cart, books);

  assert.equal(totals.delivery, 200);
  assert.equal(totals.total, 3700);
});

test("PDF checkout requires compatibility confirmation", () => {
  const books = [
    { id: "d", price: 600, format: "PDF", stock: 5 }
  ];

  const cart = [{ id: "d", quantity: 1 }];

  const form = {
    name: "Demo Student",
    email: "student@example.com",
    city: "",
    address: "",
    pdfReady: false
  };

  assert.equal(
    validateCheckout(form, cart, books).pdfReady,
    "Confirm that you can open PDF files before ordering a PDF."
  );

  assert.deepEqual(
    validateCheckout({ ...form, pdfReady: true }, cart, books),
    {}
  );
});
