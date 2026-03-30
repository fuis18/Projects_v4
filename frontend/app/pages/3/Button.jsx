export default function Button({ type,text,value }) {
  let name = ""
  if (type == "0") name = "f3__button-b";
  else name = "f3__button-s";
  return (
    <button className={`f3__button-n ${name}`} value={value}>{text}</button>
  );
}
