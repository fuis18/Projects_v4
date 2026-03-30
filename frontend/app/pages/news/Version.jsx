import Image from "next/image";

export default function Version({ data, id }) {
  return (
    <div className="news__version-content">
      <Image
        className="news__version-image"
        src={`/img/1.png`}
        width={150}
        height={150}
        alt={`Versión ${id}`}
      />
      <div className="news__version-info">
        <div className="news__version-title">{`Versión: ${id} - ${data.title}`}</div>
        <ul className="news__version-description">
          {data.description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
