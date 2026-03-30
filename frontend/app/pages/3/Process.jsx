"use client";
import React, { useEffect, useRef } from "react";

function normalizeArray(arr) {
	if (!Array.isArray(arr)) return arr; // Si no es un array, devolver tal cual.

	let result = [];
	let sign = 1;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === "+") continue; // Ignorar '+'
		if (arr[i] === "-") {
			sign *= -1; // Invertir signo
			continue;
		}

		// Si el elemento es un número (o cadena numérica), aplicar signo
		if (!isNaN(arr[i])) {
			result.push(sign * Number(arr[i]));
		} else {
			result.push(arr[i]); // Mantener elementos no numéricos sin cambios
		}

		sign = 1; // Resetear signo después de aplicarlo
	}

	return result;
}

function deepEqual(a, b) {
	// 🔥 Normalizar ambos arrays ANTES de compararlos
	a = normalizeArray(a);
	b = normalizeArray(b);

	// Comparación estricta para valores primitivos
	if (a === b) return true;

	// Comparar arrays elemento por elemento
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		return a.every((val, i) => deepEqual(val, b[i]));
	}

	// Si uno es un array y el otro no, y el array tiene un único elemento
	if (Array.isArray(a) && !Array.isArray(b)) {
		return a.length === 1 && deepEqual(a[0], b);
	}
	if (Array.isArray(b) && !Array.isArray(a)) {
		return b.length === 1 && deepEqual(a, b[0]);
	}

	// Comparar objetos por sus propiedades
	if (
		typeof a === "object" &&
		a !== null &&
		typeof b === "object" &&
		b !== null
	) {
		const keysA = Object.keys(a);
		const keysB = Object.keys(b);
		if (keysA.length !== keysB.length) return false;
		return keysA.every((key) => deepEqual(a[key], b[key]));
	}

	// En cualquier otro caso, son diferentes
	return false;
}

const handlingCommas = (arr) => {
	if (!Array.isArray(arr)) return arr;
	let sign = false;
	return arr
		.map((item, j) => {
			if (item === "+" && Math.sign(arr[j + 1]) === -1) return " ";
			if (item === "-" && Math.sign(arr[j + 1]) === -1) {
				sign = true;
				return " ";
			}
			if (Math.sign(item) === -1) {
				if (sign)
					return `+ ${-item} ${
						Math.sign(arr[j + 1]) == 1 ? " +" : ""
					}`;
				return `- ${-item} ${Math.sign(arr[j + 1]) == 1 ? " +" : ""}`;
			}
			if (Math.sign(item) === 1) {
				return `${item} ${Math.sign(arr[j + 1]) == 1 ? " +" : ""}`;
			}
			return item;
		})
		.join(" ");
};

function processData(data, depth, fragment) {
	data.forEach((info, i) => {
		if (deepEqual(info, data[i - 1])) return;
		let div = document.createElement("DIV");

		if (Array.isArray(info)) {
			if (Array.isArray(info[0])) processData(info, depth + 1, fragment);
			else if (
				(info.length == 2 && isNaN(info[0]) && !isNaN(info[1])) ||
				(info.length == 1 && !isNaN(info[0]))
			) {
				div.textContent = `${"| ".repeat(depth)}= ${handlingCommas(
					info
				)}`;
				fragment.appendChild(div);
			} else {
				div.textContent = `${"| ".repeat(depth)}> ${handlingCommas(
					info
				)}`;
				fragment.appendChild(div);
			}
		} else {
			div.textContent = `${"| ".repeat(depth)}= ${handlingCommas(info)}`;
			fragment.appendChild(div);
		}
	});
}

export default function Process({ data }) {
	const containerRef = useRef(null);

	useEffect(() => {
		const resultContainer = containerRef.current;
		// Remover todos los hijos de .result
		while (resultContainer.firstChild) {
			resultContainer.removeChild(resultContainer.firstChild);
		}
		const fragment = document.createDocumentFragment();

		processData(data, 0, fragment);

		containerRef.current.appendChild(fragment);
	});

	return <div className="f3__process" ref={containerRef}></div>;
}
