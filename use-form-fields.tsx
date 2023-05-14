import { useFormData } from "./use-form-data";
import { useWorking } from "./use-working";
import {ReactNode} from 'react';

interface FieldDesc {
	name: string;
	value?: string;
	label?: string;
	inputClass?: string;
	labelClass?: string;
	placeholder?: string;
	type?: string;
	required?: boolean;
	pattern?: string;
	after?: ReactNode;
}

interface Options {
	wrapClass?: string;
	inputClass?: string;
}

export function useFormFields(fields: FieldDesc[], options: Options) {
	const defaultFields = Object.fromEntries(
		fields.map((field) => [field.name, field.value])
	);
	const { formData, onChange, onCheck, setFormKey } = useFormData(defaultFields);
	const { isWorking, wrapWorking } = useWorking(false);

	const render = () => {
		return fields.map((field) => {
			const isOtherType = field.type !== "checkbox" && field.type !== 'textarea';
			return (
				<div className={options.wrapClass ?? "form-group"} key={field.name}>
					<label className="w-100">
						{field.type === "checkbox" && (
							<>
								<div className="d-flex gap-2">
									<input
										type="checkbox"
										name={field.name}
										checked={formData[field.name] ?? false}
										className={field.inputClass ?? options.inputClass ?? "form-check-input"}
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
										children={formData[field.name] ?? ""}
										className={field.inputClass ?? options.inputClass ?? "form-check-input"}
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
									className={field.inputClass ?? options.inputClass ?? "form-check-input"}
									onChange={onChange}
									pattern={field.pattern}
								/>
							</>
						)}
					</label>
					{field?.after}
				</div>
			);
		});
	};

	const canSubmit = () => !isWorking;

	return {
		fields,
		defaultFields,
		render,
		formData,
		onChange,
		isWorking,
		wrapWorking,
		canSubmit,
		setFormKey
	};
}
