export default function Input({
  id,
  name,
  value,
  onChange,
  children,
  textarea = false,
}) {
  return (
    <div className={`form__input-content ${name}`}>
      <label>{children}</label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        ></textarea>
      ) : (
        <input type="text" id={id} name={name} value={value} onChange={onChange} />
      )}
    </div>
  );
}
