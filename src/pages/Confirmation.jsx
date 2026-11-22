import { Link } from "react-router-dom";
import Summary from "../components/Summary";

export default function Confirmation({ order }) {
  if (!order) {
    return (
      <section className="panel">
        <h1>No current confirmation</h1>
        <p>
          Complete checkout to view a confirmation.
          Confirmations are not saved after refresh.
        </p>
        <Link to="/cart">Review your cart</Link>
      </section>
    );
  }

  return (
    <>
      <section className="panel success">
        <p className="eyebrow">Simulation complete</p>
        <h1>Your selection is confirmed</h1>
        <p>Reference: {order.id}</p>
        <p>No payment was taken and no real order was placed.</p>
      </section>

      <section className="panel">
        <h2>Selected books</h2>

        <ul>
          {order.items.map((item) => (
            <li key={item.id}>
              {item.title} — {item.format} —
              {item.quantity} × Rs. {item.price}
            </li>
          ))}
        </ul>

        {order.totals.hasPrinted && (
          <p>Simulated delivery city: {order.city}</p>
        )}

        {order.totals.hasPdf && (
          <p>PDF fulfilment is simulated; no download is supplied.</p>
        )}
      </section>

      <Summary totals={order.totals} />
      <Link className="button" to="/">Browse more books</Link>
    </>
  );
}
