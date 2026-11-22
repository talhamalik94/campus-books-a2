# Campus Books

Web Programming Assignment 02

- Student: Talha Malik
- Roll number: 24I-2066
- Section: ADD_SECTION
- Repository: https://github.com/talhamalik94/campus-books-a2
- Deployment: ADD_DEPLOYMENT_URL

## Business profile

Campus Books is a fictional bookstore for university students.
It offers ten original fictional books and guides.
Printed delivery serves Islamabad and Rawalpindi.

The main customer task is to discover books, compare formats,
build a cart and complete simulated checkout.

The business goal is informed and successful order completion.

## Requirements

Use a Node.js version supported by the installed Vite version.
Node.js 24 is suitable for this project setup.

## Commands

```bash
npm ci
npm run dev
npm run build
npm run preview
node --test
```

## Routes

- `/`: catalogue, search, filters and sorting
- `/books/:id`: details
- `/cart`: quantities, removal, conflicts and summary
- `/checkout`: validated customer form
- `/confirmation`: simulated result
- `/about`: business and rules

## Operating rules

1. Quantity is a whole number from one to the smaller of stock or five.
2. PDF orders require confirmation of PDF-reader compatibility.
3. Printed delivery costs Rs. 200 below a printed subtotal of Rs. 3,000.
   Delivery is free at or above Rs. 3,000.
   PDF-only orders have no delivery charge.

Printed orders also require a supported city and a delivery address.

## Edge-case demonstrations

Expand Assignment demonstration controls near the bottom of the app.

- Loading failure: select the control, then Retry loading.
- Empty dataset: select Empty dataset; recover with Normal data.
- Changed availability: add two b1 copies, refresh, then reduce b1 stock to one.
- Removed record: add b1, then remove b1 from the catalogue.
- Invalid ID: open /books/unknown.
- Missing information: open /books/b9.
- Long content: inspect b8 at 390 px.
- No results: search zzzzz.
- Malformed storage: follow docs/VERIFICATION.md.

## Frontend improvements

- Explicit format, price and availability on cards.
- In-stock filtering combined with search and sorting.
- Optional inline promotions that do not cover the catalogue.

See DECISIONS.md for alternatives, tradeoffs and evidence locations.

## Concept map

| Concept | File | Component or function |
|---|---|---|
| Components and props | src/components/BookCard.jsx | BookCard |
| Callback props | src/pages/Cart.jsx | onChange and onRemove |
| Shared state | src/App.jsx | App |
| Functional updates | src/App.jsx | addBook, changeQuantity, changeForm |
| Immutable arrays | src/App.jsx | map, filter and spread |
| Controlled inputs | src/pages/Checkout.jsx | Checkout |
| Validation | src/utils/rules.js | validateCheckout |
| Derived values | src/utils/rules.js | getTotals |
| Effects and cleanup | src/App.jsx | loading effect and cancelled flag |
| Asynchronous code | src/services/loadBooks.js | loadBooks |
| Local storage | src/utils/storage.js and src/App.jsx | readCart and persistence effect |
| Route parameters | src/pages/Details.jsx | useParams |
| Search parameters | src/pages/Catalog.jsx | useSearchParams |
| Navigation | src/pages/Checkout.jsx | useNavigate |
| Conditional rendering | src/App.jsx | loading, failure and ready states |
| Automated tests | tests/rules.test.js | exported business-rule functions |

## Assets and content

The open-book SVG is original project artwork.
Book titles, authors, descriptions, prices and stock are fictional.
Reference screenshots are investigation evidence, not application assets.

## Limitations

- No backend, account system, payment or real fulfilment.
- Stock is mock data and is not reserved across users.
- PDF-reader compatibility is self-declared.
- Cart persistence belongs to one browser.
- Contact fields and confirmation do not survive refresh.
- Demonstration data modes reset on refresh.

## Verification

Manual actions, expected results and observed results are recorded
in docs/VERIFICATION.md.

Run node --test to execute twelve automated checks.

## Simulated inventory updates

Successful checkout subtracts purchased quantities from current stock.
Adding items to the cart does not reserve stock.
Remaining stock is saved in local storage and restored after refresh.
Sold-out titles cannot be added and are hidden by the in-stock filter.

Inventory belongs to this browser only. It is not shared across customers
or synchronised between open tabs.

To reset inventory for a fresh demonstration, run this in the browser console:

localStorage.removeItem("campus-books-stock-v1");
location.reload();
