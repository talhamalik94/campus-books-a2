export default function Summary({ totals }) {
  return (
    <section className="panel summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Order summary</h2>

      <dl>
        <div>
          <dt>Copies</dt>
          <dd>{totals.count}</dd>
        </div>

        <div>
          <dt>Books</dt>
          <dd>Rs. {totals.subtotal.toLocaleString()}</dd>
        </div>

        <div>
          <dt>Delivery</dt>
          <dd>Rs. {totals.delivery.toLocaleString()}</dd>
        </div>

        <div className="total">
          <dt>Total</dt>
          <dd>Rs. {totals.total.toLocaleString()}</dd>
        </div>
      </dl>

      <p>
        {totals.hasPrinted
          ? "Delivery is free when the printed-book subtotal reaches Rs. 3,000."
          : "Digital-only orders have no delivery charge."}
      </p>

      <p className="muted">Simulated order. No payment will be taken.</p>
    </section>
  );
}
