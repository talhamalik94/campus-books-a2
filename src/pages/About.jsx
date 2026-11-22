export default function About() {
  return (
    <section className="panel">
      <h1>About Campus Books</h1>

      <p>
        Campus Books is a fictional bookstore for university students.
        We offer original learning guides and fictional leisure books.
      </p>

      <h2>Our service area</h2>
      <p>Printed-book delivery is available in Islamabad and Rawalpindi.</p>
      <p>PDF guides require a device that can open PDF files.</p>

      <h2>Our order rules</h2>
      <ul>
        <li>One to five copies per title, subject to current stock.</li>
        <li>PDF orders require confirmation of PDF-reader compatibility.</li>
        <li>
          Printed delivery costs Rs. 200 below a printed subtotal of Rs. 3,000.
          It is free at Rs. 3,000 or above.
        </li>
        <li>PDF-only orders have no delivery charge.</li>
      </ul>

      <h2>Assignment demonstration</h2>
      <p>
        This is a frontend project. Orders, availability, delivery and digital
        fulfilment are simulated. No payment is collected.
      </p>
    </section>
  );
}
