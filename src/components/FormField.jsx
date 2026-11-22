export default function FormField({
  name,
  label,
  value,
  onChange,
  error,
  type = "text"
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />

      {error && (
        <p className="error" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
