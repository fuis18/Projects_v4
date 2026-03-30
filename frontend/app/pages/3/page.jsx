"use client";
import Main from "@/app/components/Main";
import "./css.css";
import Button from "./Button";
import Process from './Process'
import React, { useState, useEffect, useRef, useCallback } from "react";

const num = (quest) => {
  // Juntar números
  return quest.reduce(
    (arr, item) => {
      let last = arr.length - 1;
      // Es un número o un punto
      if (!isNaN(item) || item === ".") {
        if (!isNaN(arr[last])) {
          arr[last] = (arr[last] || "") + item;
        } else if (arr[last] == ".") {
          arr[last] = arr[last] + item;
        } else {
          arr.push(item);
        }
      } else {
        if (arr[last] !== undefined && arr[last] !== "") {
          arr.push(item);
        } else {
          arr[last] = item;
        }
      }
      return arr;
    },
    [""]
  );
};

const calculate = (quest, answer) => {
  console.log("Inicio ", quest);

  let progress = [];

  const processParentheses = (arr) => {
    // Separar en parentesis
    let stack = [];
    let startIdx = 0;
    let bParenthesis = false;
    let nParenthesis = 0;
    let mParenthesis = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == "(") {
        if (nParenthesis == 0) startIdx = i; // Guardar el índice de inicio del paréntesis
        bParenthesis = true;
        nParenthesis++;
      } else if (arr[i] == ")") {
        nParenthesis--;
        if (nParenthesis == 0 && bParenthesis) {
          let temporal = calculate(arr.slice(startIdx + 1, i));
          progress.push(temporal[1]);
          // console.log(temporal[1]);
          temporal = temporal[0];
          if (isNaN(stack[stack.length - 1])) stack.push(temporal);
          else stack.push("x", temporal);
          // console.log(stack)
          bParenthesis = false;
          mParenthesis = true;
        }
      } else if (!bParenthesis) {
        if (mParenthesis && !isNaN(arr[i])) stack.push("x");
        stack.push(arr[i] === "ANS" ? answer : arr[i]);
        mParenthesis = false;
      } else if (bParenthesis && arr.length - 1 == i) {
        let temporal = calculate(arr.slice(startIdx + 1, i + 1));
        if (isNaN(stack[stack.length - 1])) stack.push(temporal);
        else stack.push("x", temporal);
      }
    }
    return stack;
  };

  const separator = (arr) => {
    // Resolver problemas
    let k = 0;
    let temporal = [];
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (["+", "-"].includes(arr[i])) {
        // Si son las operaciones
        if (i !== 0) k++;
        temporal = [];
        temporal.push(arr[i]);
        result[k] = temporal;
      } else {
        // Si es un número
        temporal.push(arr[i]);
        result[k] = temporal;
      }
    }
    return result;
  };

  const operator = (arr) => {
    // Hacer operaciones
    let sign = "+";
    let op = "";
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
      if (["+", "-"].includes(arr[i])) {
        if (arr[i] == "-" && sign == "-") sign = "+";
        else sign = arr[i];
      } else if (["x", "/", "√"].includes(arr[i])) {
        op = arr[i];
      } else if (!isNaN(arr[i])) {
        let [NI1, ND1] = num.toString().split(".");
        let [NI2, ND2] = arr[i].toString().split(".");
        ND2 = ND2 ? ND2 : "";
        ND1 = ND1 ? ND1 : "";
        let NF1 = ND1.length;
        let NF2 = ND2.length;
        if (op == "x" || op == "/") {
          if (op == "x") {
            if (Math.sign(arr[i]) == 1) {
              num =
                (parseInt(NI1.concat(ND1)) *
                parseInt(sign.concat(NI2.concat(ND2)))) /
                Math.pow(10, NF1 + NF2);
            } else {
              num =
                (parseInt(NI1.concat(ND1)) * parseInt(NI2.concat(ND2))) /
                Math.pow(10, NF1 + NF2);
              if (sign == "-") num *= -1;
            }
          } else {
            if (Math.sign(arr[i]) == 1) {
              num =
                (parseInt(NI1.concat(ND1)) * Math.pow(10, NF2)) /
                (parseInt(sign.concat(NI2.concat(ND2))) * Math.pow(10, NF1));
            } else {
              num =
                (parseInt(NI1.concat(ND1)) * Math.pow(10, NF2)) /
                (parseInt(NI2.concat(ND2)) * Math.pow(10, NF1));
              if (sign == "-") num *= -1;
            }
          }
        } else if (op == "√") {
          console.log(num, arr, arr[i], sign);
          let t = Math.sqrt(arr[i]);
          if (t.toString().includes(".")) num = [op, arr[i]];
          else if (arr[i] < 0) num = [op, arr[i]];
          else num = Math.sqrt(arr[i]);
        } else if (sign == "+" || sign == "-") {
          let float = 0; // Llevarse una
          if (NF1 < NF2) ND1 = `${ND1}${"0".repeat(NF2 - NF1)}`;
          else ND2 = `${ND2}${"0".repeat(NF1 - NF2)}`;
          float = ND2.toString().length;
          // Desarrollar
          // console.log(parseInt(`${NI1}${ND1}`), parseInt(`${NI2}${ND2}`), "sign: "+sign);
          if (Math.sign(parseInt(`${NI2}${ND2}`)) == -1 && sign == "-") {
            num = parseFloat(
              `${
                (parseInt(`${NI1}${ND1}`) - parseInt(`${NI2}${ND2}`)) /
                Math.pow(10, float)
              }`
            );
          } else {
            num = parseFloat(
              `${
                (parseInt(`${NI1}${ND1}`) + parseInt(`${NI2}${ND2}`)) /
                Math.pow(10, float)
              }`
            );
            if (sign == "-") num *= -1;
          }
          sign = "+";
        } else {
          console.log("Error: ", arr[i]);
        }
      } else {
        console.log("Error: ", arr[i]);
      }
    }
    if (arr.length == 1 && ["+", "-"].includes(arr[0])) return sign;
    else if (arr.length == 1 && isNaN(arr[0])) return op;
    else if (isNaN(arr[arr.length - 1])) return [num, op];
    else return num;
  };

  progress.push(quest);

  // Separar parentesis
  quest = processParentheses(quest);
  // console.log("Respuesta ", quest);
  progress.push(quest);

  // Separar en Suma y resta
  quest = separator(quest);
  // console.log("Respuesta ", quest);

  // Resuelve
  quest = quest.map(operator);
  // console.log("Respuesta ", quest);
  progress.push(quest);
  
  // Aplanar Arrays
  quest = quest.reduce((accumulate, value) => accumulate.concat(value), []);
  console.log("Respuesta ", quest);

  // Suma y Resta
  quest = operator(quest);
  console.log("Respuesta ", quest);
  progress.push(quest);

  return [quest,progress];
};

export default function Page() {
  const buttonsRef = useRef(null);
  const [quest, setQuest] = useState([]);
  const [history, setHistory] = useState(null);
  const [operation, setOperation] = useState(null);
  const [answer, setAnswer] = useState("0");
  const [result, setResult] = useState(false);
  const [process, setProcess] = useState([])

  const options = useCallback(
    (btn) => {
      if (btn === "AC") {
        setQuest([]); // Reiniciar la operación
        setAnswer("0"); // Reiniciar la respuesta a 0
        setOperation(""); // Limpiar la operación mostrada
      } else if (btn === "DEL" || btn === "Backspace") {
        const updatedQuest = [...quest];
        updatedQuest.pop(); // Eliminar el último valor
        setQuest(updatedQuest); // Actualizar el estado de la operación
        setOperation(updatedQuest.join("")); // Actualizar la operación mostrada
      } else if (btn === "Enter" || btn === "=") {
        setHistory(answer);
        let pack = calculate(num(quest), answer);
        isNaN(pack[0]) ? setAnswer("ERROR") : setAnswer(pack[0]);
        setProcess(pack[1])
        setResult(true);
      }
    },
    [quest, answer]
  );

  const buttonValue = useCallback(
    (btn, ctrl) => {
      // console.log(btn, ctrl);
      if (["Backspace", "Enter", "DEL", "AC", "="].includes(btn)) {
        if (btn === "Backspace" && ctrl) {
          options("AC");
        } else {
          options(btn);
        }
      } else if (
        [
          "0","1","2","3","4","5","6","7","8","9",
          ".","/","*","-","+","(",")","x","X","ANS",
          "a","A","^","v","V","^2","%","EXP","E","e",
        ].includes(btn)
      ) {
        let info = "";
        if (btn === "X" || btn === "*") btn = "x";
        if (btn === "a" || btn === "A") btn = "ANS";
        if (btn === "v" || btn === "V") btn = "√";
        if (btn === "EXP" || btn === "E") btn = "e";
        if (result) {
          // Si ya hay un resultado previo y el usuario presiona un número u operador
          if (["x", "/", "-", "+", "^"].includes(btn) && answer != 0) {
            // Agregar `ANS` seguido del operador si es una nueva operación
            setQuest(["ANS", btn]);
            info = ["ANS", btn].join("");
          } else {
            // Si es un número u otro, reiniciar la operación
            setQuest([btn]);
            info = btn;
          }
          setResult(false); // Desactivar el resultado previo para la próxima operación
        } else {
          // Si no hay resultado previo, simplemente continuar la operación
          setQuest([...quest, btn]);
          info = quest.join("") + btn;
        }
        setOperation(info);
      }
    },
    [options, quest, result, answer]
  );

  useEffect(() => {
    let target = "button";
    const handleClick = (event) => {
      event.target.blur();
      buttonValue(event.target.value);
    };
    
    const buttonsContainer = buttonsRef.current;
    if (buttonsContainer) {
      const buttons = buttonsContainer.querySelectorAll(target);
      buttons.forEach((button) =>
        button.addEventListener("click", handleClick)
      );
    }

    const handleKeyDown = (event) => buttonValue(event.key, event.ctrlKey);

    const handlePaste = (event) => {
      const pastedData = event.clipboardData.getData("text"); // Obtiene el texto pegado
      console.log("Contenido pegado:", pastedData);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("paste", handlePaste);

    return () => {
      if (buttonsContainer) {
        const buttons = buttonsContainer.querySelectorAll(target);
        buttons.forEach((button) =>
          button.removeEventListener("click", handleClick)
        );
      }
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("paste", handlePaste);
    };
  }, [buttonValue]);

  return (
    <Main title="Calculadora" className="cont__pages">
      <div className="f3" ref={buttonsRef}>
        <div className="f3__calculator">
          <div className="f3__window">
            <div className="f3__window-history">{history}</div>
            <div className="f3__window-quest">
              <div className="f3__window-operation">{operation}</div>
              <div className="f3__window-text">_</div>
            </div>
            <div className="f3__window-answer">{answer}</div>
          </div>
          <div className="f3__buttons-s">
            <Button type="1" text="(" value="(" />
            <Button type="1" text=")" value=")" />
            <Button type="1" text="√" value="v" />
            <Button type="1" text="x²" value="^2" />
            <Button type="1" text="^(x)" value="^" />
            <Button type="1" text="%" value="%" />
          </div>
          <div className="f3__buttons-b">
            <Button type="0" text="7" value="7" />
            <Button type="0" text="8" value="8" />
            <Button type="0" text="9" value="9" />
            <Button type="0" text="DEL" value="DEL" />
            <Button type="0" text="AC" value="AC" />
            <Button type="0" text="4" value="4" />
            <Button type="0" text="5" value="5" />
            <Button type="0" text="6" value="6" />
            <Button type="0" text="x" value="x" />
            <Button type="0" text="/" value="/" />
            <Button type="0" text="1" value="1" />
            <Button type="0" text="2" value="2" />
            <Button type="0" text="3" value="3" />
            <Button type="0" text="+" value="+" />
            <Button type="0" text="-" value="-" />
            <Button type="0" text="0" value="0" />
            <Button type="0" text="•" value="." />
            <Button type="0" text="EXP" value="EXP" />
            <Button type="0" text="ANS" value="ANS" />
            <Button type="0" text="=" value="=" />
          </div>
        </div>
        <Process data={process}/>
      </div>
    </Main>
  );
}
