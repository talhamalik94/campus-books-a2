# Frontend decisions

Reference page: https://libertybooks.com/collections/fiction

These observations refer to the inspected catalogue page.
Confirm them against your own saved screenshots before submission.

## D1: Show format before opening details

- Problem: The inspected reference cards did not show a consistent separate format field.
- Decision: Show category, format, price and availability on every book card.
- Alternative: Show the format only on the details page.
- Reason: Students can compare formats without repeatedly opening details.
- Tradeoff: Cards contain more text and can become taller.
- Code: src/components/BookCard.jsx, BookCard.
- Layout: Full titles wrap, and cards become one column on narrow screens.
- Reference evidence: docs/screenshots/reference-1.png.
- Improvement evidence: docs/screenshots/improvement-1.png.
- Check: Compare Paperback and PDF cards without opening either one.

## D2: Filter available books without changing the cart

- Problem: The inspected catalogue mixed available and unavailable books without a visible in-stock-only filter.
- Decision: Add an in-stock checkbox that combines with search, category and sorting.
- Alternative: Hide all unavailable books automatically.
- Reason: Customers can choose whether to explore all books or only available ones.
- Tradeoff: Another control must fit into the mobile layout.
- Code: src/pages/Catalog.jsx, Catalog; src/App.jsx, shared cart state.
- State behaviour: Filters use URL parameters, and filtering never removes cart selections.
- Reference evidence: docs/screenshots/reference-2.png.
- Improvement evidence: docs/screenshots/improvement-2.png.
- Check: Add a book, change filters, open details and return; check filters and cart.

## D3: Make promotions optional

- Problem: A mailing-list modal appeared over the reference catalogue and interrupted browsing.
- Decision: Put the offer inside an optional inline details section after the catalogue.
- Alternative: Use a dismissible promotional modal.
- Reason: Customers can browse without first dismissing a promotion.
- Tradeoff: The offer is less prominent and may receive less attention.
- Code: src/pages/Catalog.jsx, optional offers details element.
- Reference evidence: docs/screenshots/reference-3.png.
- Improvement evidence: docs/screenshots/improvement-3.png.
- Check: Browse normally, then open and close the offer using the keyboard.
