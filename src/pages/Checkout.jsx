import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import Summary from "../components/Summary";
import { getTotals, validateCheckout } from "../utils/rules";

export default function Checkout({
  books,
  cart,
  form,
  onFormChange,
  onConfirm
}) {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const totals = getTotals(cart, books);

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateCheckout(form, cart, books);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    if (onConfirm()) {
      navigate("/confirmation");
    } else {
      setErrors({
        cart: "Your selection changed. Please review your cart."
      });
    }
  }

  if (cart.length === 0) {
    return (
      <section className="panel">
        <h1>No books to check out</h1>
        <Link to="/">Browse books</Link>
      </section>
    );
  }

  return (
    <>
      <h1>Checkout</h1>
      <p>Demonstration only. Use fictional contact and address details.</p>

      <div className="two-column">
        <form className="panel" noValidate onSubmit={handleSubmit}>
          <h2>Customer details</h2>

          {Object.keys(errors).length > 0 && (
            <div className="alert" role="alert">
              <p>
                Please correct the fields below.
                Your other entries have been kept.
              </p>

              {errors.cart && (
                <p>
                  {errors.cart} <Link to="/cart">Review cart</Link>
                </p>
              )}
            </div>
          )}

          <FormField
            name="name"
            label="Full name"
            value={form.name}
            onChange={onFormChange}
            error={errors.name}
          />

          <FormField
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={onFormChange}
            error={errors.email}
          />

          {totals.hasPrinted && (
            <>
              <div className="field">
                <label htmlFor="city">Delivery city</label>

                <select
                  id="city"
                  value={form.city}
                  onChange={(event) =>
                    onFormChange("city", event.target.value)
                  }
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? "city-error" : undefined}
                >
                  <option value="">Choose a city</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Other">Other city</option>
                </select>

                {errors.city && (
                  <p id="city-error" className="error">{errors.city}</p>
                )}
              </div>

              <FormField
                name="address"
                label="Delivery address"
                value={form.address}
                onChange={onFormChange}
                error={errors.address}
              />
            </>
          )}

          {totals.hasPdf && (
            <div className="field">
              <label className="check" htmlFor="pdfReady">
                <input
                  id="pdfReady"
                  type="checkbox"
                  checked={form.pdfReady}
                  onChange={(event) =>
                    onFormChange("pdfReady", event.target.checked)
                  }
                  aria-invalid={Boolean(errors.pdfReady)}
                  aria-describedby={
                    errors.pdfReady ? "pdfReady-error" : undefined
                  }
                />
                I can open PDF files on my device
              </label>

              {errors.pdfReady && (
                <p id="pdfReady-error" className="error">
                  {errors.pdfReady}
                </p>
              )}
            </div>
          )}

          <p>
            No card details are required.
            No real order or download is created.
          </p>

          <button type="submit">Confirm simulated order</button>
          <p><Link to="/cart">Back to cart</Link></p>
        </form>

        <Summary totals={totals} />
      </div>
    </>
  );
}
