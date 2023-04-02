import { useFormData } from "./use-form-data";
import { useWorking } from "./use-working";

export function useFormFields(fields) {
	const defaultFields = Object.fromEntries(
		fields.map((field) => [field.name, field.value])
	);
	const { formData, onChange, onCheck } = useFormData(defaultFields);
	const { isWorking, wrapWorking } = useWorking(false);

	const render = () => {
		return fields.map((field) => {
			const isOtherType = field.type !== "checkbox" && field.type !== 'textarea';
			return (
				<div className="form-group" key={field.name}>
					<label className="w-100">
						{field.type === "checkbox" && (
							<>
								<div className="d-flex gap-2">
									<input
										type="checkbox"
										name={field.name}
										checked={formData[field.name] ?? false}
										className="form-check-input"
										onChange={onCheck}
									/>
									<span>{field.label}</span>
								</div>
							</>
						)}
						{field.type === "textarea" && (
							<>
								<span className={field.labelClass}>{field.label}</span>
									<textarea
										name={field.name}
										children={formData[field.name] ?? false}
										className={field.inputClass ?? "form-control"}
										onChange={onChange}
									/>
							</>
						)}
						{isOtherType && (
							<>
								<span className={field.labelClass}>{field.label}</span>
								<input
									name={field.name}
									placeholder={field.placeholder}
									value={formData[field.name] ?? ""}
									className={field.inputClass ?? "form-control"}
									onChange={onChange}
								/>
							</>
						)}
					</label>
				</div>
			);
		});
	};

	return {
		fields,
		defaultFields,
		render,
		formData,
		onChange,
		isWorking,
		wrapWorking,
	};
}
