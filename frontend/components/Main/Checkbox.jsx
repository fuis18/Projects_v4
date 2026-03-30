export default function Checkbox({
  variable,
  setVariable,
  nameChecked,
  nameUnchecked,
}) {
  return (
    <div
      className={`form__checkbox-content ${variable ? "checked" : "unchecked"}`}
      onClick={() => setVariable(!variable)}
    >
      <i></i>
      <div className="form__checkbox-checked">{nameChecked}</div>
      <div className="form__checkbox-unchecked">{nameUnchecked}</div>
    </div>
  );
}
