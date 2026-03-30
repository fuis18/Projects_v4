export default function Input({ id, name, value, onChange, textarea = false }) {
	return (
		<div className={`form__input-content ${name}`}>
			{textarea ? (
				<textarea
					id={id}
					name={name}
					value={value}
					onChange={onChange}
				></textarea>
			) : (
				<input
					type="text"
					id={id}
					name={name}
					value={value}
					onChange={onChange}
				/>
			)}
		</div>
	);
}
