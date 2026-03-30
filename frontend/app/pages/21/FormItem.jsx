"use client";
import React from "react";
import Input from "./Input";

export default function FormItem({ mesaIndex, mesaData, handleChange }) {
	return (
		<div className={`f21__mesa ${mesaData.enabled ? "" : "disabled"}`}>
			<div className="f21__mesa_head">
				<div>Mesa {mesaIndex + 1}</div>
			</div>

			<div className="f21__mesa_body">
				{mesaData.pedidos.map((pedido, pedidoIndex) => (
					<div className="f21__mesa_body-item" key={pedidoIndex}>
						<Input
							id={`pedido_${mesaIndex}_${pedidoIndex}`}
							name={`pedido_${mesaIndex}_${pedidoIndex}`}
							value={pedido.pedido}
							onChange={handleChange}
							disabled={!mesaData.enabled || !pedido.enabled}
						/>

						<button
							type="button"
							disabled={!mesaData.enabled || !pedido.enabled}
							className="f21__mesa_body-button"
						></button>
					</div>
				))}
			</div>
		</div>
	);
}
