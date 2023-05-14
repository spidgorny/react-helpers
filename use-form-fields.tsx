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
	formatString?: (val: any) => string;
}

interface Options {
	wrapClass?: string;
	inputClass?: string;
	defaultFields?: Record<string, any>
}

export function useFormFields(fields: FieldDesc[], options?: Options) {
	const defaultFields = options?.defaultFields ?? Object.fromEntries(
		fields.map((field) => [field.name, field.value])
	);
	const { formData, onChange, onCheck, setFormKey } = useFormData(defaultFields);
	const { isWorking, wrapWorking } = useWorking(false);

	const render = () => {
		return fields.map((fieldDesc) => {
			const isOtherType = fieldDesc.type !== "checkbox" && fieldDesc.type !== 'textarea';
			const fieldValue = formData[fieldDesc.name] ?? "";
			const stringValue = "formatString" in fieldDesc ? fieldDesc.formatString(fieldValue) : fieldValue;
			console.log(fieldValue, stringValue);

			return (
				<div className={options?.wrapClass ?? "form-group"} key={fieldDesc.name}>
					<label className="w-100">
						{fieldDesc.type === "checkbox" && (
							<>
								<div className="d-flex gap-2">
									<input
										type="checkbox"
										name={fieldDesc.name}
										checked={formData[fieldDesc.name] ?? false}
										className={fieldDesc.inputClass ?? options?.inputClass ?? "form-check-input"}
										onChange={onCheck}
									/>
									<span>{fieldDesc.label}</span>
								</div>
							</>
						)}
						{fieldDesc.type === "textarea" && (
							<>
								<span className={fieldDesc.labelClass}>{fieldDesc.label}</span>
									<textarea
										name={fieldDesc.name}
										value={formData[fieldDesc.name] ?? ""}
										className={fieldDesc.inputClass ?? options?.inputClass ?? "form-check-input"}
										onChange={onChange}
									/>
							</>
						)}
						{isOtherType && (
							<>
								<span className={fieldDesc.labelClass}>{fieldDesc.label}</span>
								<input
									name={fieldDesc.name}
									placeholder={fieldDesc.placeholder}
									value={stringValue}
									className={fieldDesc.inputClass ?? options?.inputClass ?? "form-check-input"}
									onChange={onChange}
									pattern={fieldDesc.pattern}
								/>
							</>
						)}
					</label>
					{fieldDesc?.after}
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
