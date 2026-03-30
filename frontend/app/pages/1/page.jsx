"use client";
import { useState, useEffect, useRef } from "react";
import Main from "@/app/components/Main";
import "./css.css";

export default function Page() {
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0)

  useEffect(() => {
    // Función para actualizar el tamaño de la pantalla
    const updateSize = () => {
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)
    };

    // Obtener tamaño inicial
    updateSize();

    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener("resize", updateSize);

    // Cleanup para evitar fugas de memoria
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    // Config styles
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ajustar tamaño del canvas al width de la pantalla
    if (width <= 800) {
      canvas.width = width - 54;
      canvas.height = height - 500;
    } else {
      canvas.width = width - 460;
      canvas.height = height - 150;
    }
    // Canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Dibujar un fondo
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("¡Canvas dinámico en Next.js!", 50, 50);
  }, [width]); // Se ejecuta cada vez que el width cambia

  return (
    <Main title="Funciones" className="cont__pages">
      <div className="f1">
        <div className="f1__table"></div>
        <div className="f1__grafic">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </Main>
  );
}
