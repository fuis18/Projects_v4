"use client";
import React, { useEffect, useState } from "react";
import Main from "@/app/components/Main";
import "./css.css";
import { API_URL } from "@/config";
import FormItem from "./FormItem";

export default function Page() {
	const newPedido = () => ({
		pedido: "",
		enabled: false,
		complete: false,
	});

	const newMesa = () => ({
		enabled: false,
		pedidos: [
			{ pedido: "", enabled: true, complete: false },
			{ pedido: "", enabled: false, complete: false },
		],
	});

	const [formData, setFormData] = useState([
		{
			enabled: true,
			pedidos: [
				{ pedido: "", enabled: true, complete: false },
				{ pedido: "", enabled: false, complete: false },
			],
		},
		{
			enabled: false,
			pedidos: [
				{ pedido: "", enabled: true, complete: false },
				{ pedido: "", enabled: false, complete: false },
			],
		},
	]);

	const handleChange = (e) => {
		let [name, mesaIdx, pedidoIdx] = e.target.name.split("_");
		mesaIdx = parseInt(mesaIdx);
		pedidoIdx = parseInt(pedidoIdx);

		const value = e.target.value;

		if (name !== "pedido") return;

		setFormData((prev) => {
			const data = structuredClone(prev);

			const mesa = data[mesaIdx];
			const pedido = mesa.pedidos[pedidoIdx];

			// 1. Actualizar pedido
			pedido.pedido = value;

			// 2. Habilitar siguiente pedido si se escribió aquí
			const pedidoTieneContenido = value.trim() !== "";

			if (pedidoTieneContenido) {
				// habilitar siguiente si existe
				if (mesa.pedidos[pedidoIdx + 1]) {
					mesa.pedidos[pedidoIdx + 1].enabled = true;
				} else {
					// si no existe → agregar nuevo pedido deshabilitado
					mesa.pedidos.push(newPedido());
				}
			}

			// 3. Crear siguiente mesa si no existe (deshabilitada)
			if (!data[mesaIdx + 1]) {
				data.push(newMesa());
			}

			// 4. Habilitar la siguiente mesa SOLO si esta tiene contenido
			const mesaTieneContenido = mesa.pedidos.some(
				(p) => p.pedido.trim() !== ""
			);

			if (mesaTieneContenido && data[mesaIdx + 1]) {
				data[mesaIdx + 1].enabled = true;
			}

			return data;
		});
	};

	useEffect(() => {
		fetch(`${API_URL}/pages/r21`)
			.then((response) => response.json())
			.then((data) => {
				setFormData(data);
			})
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			fetch(`${API_URL}/pages/r21`)
				.then((res) => res.json())
				.then((data) => setFormData(data))
				.catch((err) => console.error(err));
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			fetch(`${API_URL}/pages/r21`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
				.then((response) => response.json())
				.then((data) => console.log("Datos enviados:", data))
				.catch((error) => console.error(error));
		}, 2500);

		return () => clearTimeout(timer);
	}, [formData]);

	return (
		<Main title="Yanaira" className="cont__pages">
			<div className="f21">
				<form className="f21__form">
					{formData.map((mesaData, mesaIndex) => (
						<FormItem
							key={mesaIndex}
							mesaIndex={mesaIndex}
							mesaData={mesaData}
							handleChange={handleChange}
						/>
					))}
				</form>
			</div>
		</Main>
	);
}
