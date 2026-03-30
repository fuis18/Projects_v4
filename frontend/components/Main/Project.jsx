"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Project({ id, title }) {
  const [src, setSrc] = useState(`/img/${id}.svg`);
  const [name, setName] = useState("form__div__img-ok");

  return (
    <Link href={`/pages/${id}/`} className="form__div">
      <Image
        src={src}
        width={80}
        height={80}
        alt={title}
        className={name}
        onError={() => {
          setName("");
          setSrc("/img/err.png");
        }}
      />
      {title}
    </Link>
  );
}
