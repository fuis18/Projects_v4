export default function Compare({ mode, left, right, on, variable }) {
  let type = "text";
  if (mode === "title") {
    type = "text";
  } else if (mode === "number") {
    type = "number";
  }

  return (
    <>
      <input
        type={type}
        name="left"
        value={left}
        onChange={on ? (e) => on(e,variable) : undefined}
        readOnly={!on}
      />
      <div className="f0-middle">-</div>
      <input
        type={type}
        name="right"
        value={right}
        onChange={on ? (e) => on(e,variable) : undefined}
        readOnly={!on || variable == 1}
      />
    </>
  );
}
