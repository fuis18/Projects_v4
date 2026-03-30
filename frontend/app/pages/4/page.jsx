"use client";
import React, { useEffect, useState } from "react";
import Main from "@/app/components/Main";
import "./css.css";
import { API_URL } from "@/config";
import Input from "./Input";
import Joined from "./Joined";
import Image from "next/image";

export default function Page() {
	const [formData, setFormData] = useState({
		name: "",
		last: "",
		mail: "",
		about: "",
	});
	const [resultData, setResultData] = useState([]);

	// Manejo de cambios en los inputs
	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	// Envío del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();

		fetch(`${API_URL}/pages/r4`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => {
				setResultData(data.message);
				setFormData({ name: "", last: "", mail: "", about: "" });
			});
	};

	// const exportMail = (e) => {
	//   e.preventDefault();

	//   fetch(`${API_URL}/pages/m4`, {
	//     method: "POST",
	//     headers: { "Content-Type": "application/json" },
	//     body: JSON.stringify({send: true}),
	//   })
	//   setResultData([])
	// }

	useEffect(() => {
		fetch(`${API_URL}/pages/r4`)
			.then((response) => response.json())
			.then((data) => {
				setResultData(data);
			});
	}, []);

	return (
		<Main title="Admisión para Larc War" className="cont__pages" fProject="f4">
			<div className="f4">
				<Image
					src="/img/1.png"
					width={200}
					height={200}
					alt="Admisión Larc War"
					className="f4__img"
				/>
				{/* Formulario */}
				<form className="f4__form" onSubmit={handleSubmit}>
					<Input
						id="name"
						name="name"
						onChange={handleChange}
						value={formData.name}
					>
						Nombre
					</Input>
					<Input
						id="last"
						name="last"
						onChange={handleChange}
						value={formData.last}
					>
						Apellido
					</Input>
					<Input
						id="mail"
						name="mail"
						onChange={handleChange}
						value={formData.mail}
					>
						Correo
					</Input>
					<Input
						id="about"
						name="about"
						onChange={handleChange}
						value={formData.about}
						textarea={true}
					>
						Asunto
					</Input>
					<input type="submit" value="Enviar" />
				</form>
				<form className="f4__response-content">
					<h2>Usuarios registrados</h2>
					<div className="f4__response">
						{resultData.map((info, i) => (
							<Joined key={i} data={info} />
						))}
					</div>
					{/* <input type="submit" value="Exportar"/> */}
				</form>
			</div>
		</Main>
	);
}
