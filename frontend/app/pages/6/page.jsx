"use client";
import Main from "@/app/components/Main";
import Checkbox from "@/app/components/Main/Checkbox";
import "./css.css";
import { useEffect, useState, useCallback, useRef } from "react";
import Train from './Train';

const hexa = (color) => {
  let newColor = [];
  for (let i = 0; i < 2; i++) {
    switch (color.substr(i, 1)) {
      case "a": newColor[i] = 10; break;
      case "b": newColor[i] = 11; break;
      case "c": newColor[i] = 12; break;
      case "d": newColor[i] = 13; break;
      case "e": newColor[i] = 14; break;
      case "f": newColor[i] = 15; break;
      default: newColor[i] = parseInt(color.substr(i, 1));
    }
  }
  return newColor[0] * 16 + newColor[1];
};

const rgb = (hexcolor) => {
  let red = hexcolor.substr(1, 2);
  let green = hexcolor.substr(3, 2);
  let blue = hexcolor.substr(5, 2);
  red = hexa(red);
  green = hexa(green);
  blue = hexa(blue);
  return [red, green, blue];
};

export default function Page() {
  const [network, setNetwork] = useState(null);
  const [colorText, setColorText] = useState(false);
  const [colorValue, setColorValue] = useState("#000000"); // Guardar el valor del color
  const colorInputRef = useRef(null);  // Ref para el input de color
  const sitioRef = useRef(null);  // Ref para el div de 'sitio'

  const rgb_ia = useCallback((r, g, b) => {
    let red = 0, green = 0, blue = 0;
    if (colorText) {
      red = r * 255; green = g * 255; blue = b * 255;
    } else if (r > 0.5 || g > 0.5 || b > 0.5) {
      red = 255; green = 255; blue = 255;
    }
    return `rgb(${red},${green},${blue})`;
  }, [colorText]);

  const color_run = useCallback(() => {
    if (!network || !colorValue) return;  // Verificar si la red está entrenada y el color es válido
    let entrada = {
      rojo: (rgb(colorValue)[0] + 1) / 256,
      verde: (rgb(colorValue)[1] + 1) / 256,
      azul: (rgb(colorValue)[2] + 1) / 256,
    };
    // Obtener la predicción
    let result = network.run(entrada);
    let red = result.rojo;
    let green = result.verde;
    let blue = result.azul;
    let end = rgb_ia(red, green, blue);
    // Actualizar color del texto y bordes
    sitioRef.current.style.color = end;
    sitioRef.current.style.borderWidth = "2px";
    sitioRef.current.style.borderStyle = "solid";
    sitioRef.current.style.borderColor = end;
  }, [network, colorValue, rgb_ia]);

  const handleColorChange = (event) => {
    setColorValue(event.target.value);  // Actualiza el colorValue cuando se cambia el input
    sitioRef.current.style.backgroundColor = event.target.value;  // Cambiar el color de fondo directamente
  };

  const handleCheckboxChange = () => {
    // setColorText(checkboxRef.current.checked ? 1 : 0); // Actualizar colorText
  };

  useEffect(() => {
    if (network) {
      color_run(); // Ejecutar cada vez que cambie el color o la red
    }
  }, [network, color_run]);  // Se ejecuta cuando cambia la red o el color

  return (
    <Main title="IA Background-Text" className="cont__pages">
      <div className="f6">
        <form>
          <Checkbox
            variable={colorText}
            setVariable={setColorText}
            nameChecked={"Color"}
            nameUnchecked={"Monocromatico"}
          ></Checkbox>
          <input type="color" id="color" ref={colorInputRef} value={colorValue} onChange={handleColorChange} />
        </form>
        <div id="sitio" ref={sitioRef}>Mi sitio Web</div>
        <Train setNetwork={setNetwork}></Train>
      </div>
    </Main>
  );
}
