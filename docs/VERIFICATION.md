# Verification

Date: TO RECORD
Browser and version: TO RECORD

Record actual results after performing each check.
Do not mark a check as passed before running it.

| Check | Actions | Expected behaviour | Observed |
|---|---|---|---|
| Main journey | Browse, search, open details, add books, edit cart, check out | Simulated confirmation with correct summary | Pending |
| Format comparison | Compare a Paperback and PDF card | Both formats visible before opening details | Pending |
| Availability filter | Check In stock only | Out-of-stock books disappear | Pending |
| Combined controls | Search, choose category and change sort | All controls work together | Pending |
| Filter persistence | Filter catalogue, open details, return | Previous filters remain | Pending |
| Cart preservation | Add a book and change filters | Cart selection remains | Pending |
| Optional offer | Open and close offers with keyboard | Content expands inline without covering products | Pending |
| No matching results | Search zzzzz | Helpful no-match message and reset button | Pending |
| Empty catalogue | Select Empty dataset | Distinct empty-dataset message | Pending |
| Invalid ID | Visit /books/unknown | Useful feedback and catalogue link | Pending |
| Invalid route | Visit /missing-page | Page-not-found message | Pending |
| Missing content | Open /books/b9 | Missing-image and description fallbacks | Pending |
| Long title | View b8 at 390 px | Title wraps without page-wide overflow | Pending |
| Invalid form | Submit blank checkout | Specific field errors appear | Pending |
| Input preservation | Fix one error after entering other fields | Other input remains | Pending |
| PDF compatibility | Add PDF and leave compatibility unchecked | Confirmation blocked with specific message | Pending |
| Quantity cap | Increase b1 to five | Further increase prevented | Pending |
| Stock cap | Increase b9 to two | Further increase prevented | Pending |
| Persistence | Add books and refresh | Cart restored | Pending |
| Changed stock | Add two b1 copies, refresh, reduce b1 stock to one | Conflict shown; adjustment works; invalid checkout blocked | Pending |
| Removed record | Add b1, remove b1 from catalogue | Missing item explained and removable | Pending |
| Loading recovery | Select Loading failure, then Retry loading | Catalogue loads after retry | Pending |
| Delivery boundary | Order two b1 copies, then three | Delivery changes from 200 to zero | Pending |
| PDF-only order | Order only b3 | No delivery fee or physical-address fields | Pending |
| Empty cart | Remove all books | Empty-cart message and browse action | Pending |
| Keyboard | Use Tab, Shift+Tab, Enter and Space | Core journey usable with visible focus | Pending |
| Mobile | Complete journey at 390 px | Usable controls and no page-wide overflow | Pending |
| Desktop | Complete journey at 1280 px | Readable layout and clear actions | Pending |
| Browser history | Use Back and Forward between routes | Correct routes render | Pending |
| Console | Complete journey with console open | No application errors or React warnings | Pending |
| Tests | Run node --test | All twelve tests pass | Pending |
| Public deployment | Open production URL in private window | Site opens without access request | Pending |
| Nested refresh | Open /books/b1 directly and refresh | Details page loads | Pending |
| Deployment source | Compare Vercel source commit with git rev-parse HEAD | Commits match | Pending |

## Malformed saved data

Use the browser developer console:

localStorage.setItem("campus-books-cart-v1", "{invalid");
location.reload();

Expected: an empty cart starts with an explanation that saved data could not be read.

## Demonstration notes

- Normal data restores the original catalogue.
- Demo modes reset to normal on refresh.
- The cart is saved in local storage.
- Contact fields and confirmation are not persisted.
- All orders and digital fulfilment are simulated.
