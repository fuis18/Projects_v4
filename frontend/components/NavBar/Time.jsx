import React, { useState, useEffect } from "react";

const addZeros = (n) => {
  if (n.toString().length < 2) return "0".concat(n);
  return n;
};

export default function Time() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    // Aseguramos que el código se ejecute solo en el cliente
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Limpieza de intervalo al desmontar
  }, []);

  if (!time) return null; // Evita renderizar si time no está listo

  return (
    <div className="time" aria-hidden="true">
      <div className="hora">{addZeros(time.getHours())}</div>
      <div>:</div>
      <div className="min">{addZeros(time.getMinutes())}</div>
    </div>
  );
}