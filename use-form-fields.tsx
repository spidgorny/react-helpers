import { useFormData } from "./use-form-data";
import { useWorking } from "./use-working";
import { SelectWithOptions } from "./select-with-options";
import { ReactNode } from "react";

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
	options?: object | [string, string][];
	render?: (OneTypeProps) => ReactNode;
}

interface Options {
	wrapClass?: string;
	inputClass?: string;
	defaultFields?: Record<string, any>;
}

export function useFormFields(fields: FieldDesc[], options: Options = {}) {
	const defaultFields =
		options?.defaultFields ?? Object.fromEntries(fields.map((field) => [field.name, field.value]));
	const { formData, onChange, onCheck, setFormKey } = useFormData(defaultFields);
	const { isWorking, wrapWorking } = useWorking(false);

	const render = () => {
		return fields.map((fieldDesc) => {
			const isOtherType =
				fieldDesc.type !== "checkbox" &&
				fieldDesc.type !== "textarea" &&
				fieldDesc.type !== "select" &&
				fieldDesc.type !== "render";

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
							<FormTextarea
								fieldDesc={fieldDesc}
								onChange={onChange}
								formData={formData}
								options={options}
							></FormTextarea>
						)}
						{fieldDesc.type === "select" && (
							<FormSelect
								fieldDesc={fieldDesc}
								onChange={onChange}
								formData={formData}
								options={options}
							/>
						)}
						{fieldDesc.type === "render" && (
							<FormRender
								fieldDesc={fieldDesc}
								onChange={onChange}
								formData={formData}
								options={options}
							/>
						)}
						{isOtherType && (
							<FormInput
								fieldDesc={fieldDesc}
								onChange={onChange}
								formData={formData}
								options={options}
							/>
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
		setFormKey,
	};
}

export interface OneTypeProps {
	fieldDesc: FieldDesc;
	formData: Record<string, string>;
	options: Options;
	onChange: () => void;
}

function FormInput({ formData, fieldDesc, options, onChange }: OneTypeProps) {
	const fieldValue = formData[fieldDesc.name] ?? "";
	const stringValue =
		"formatString" in fieldDesc && fieldDesc.formatString
			? fieldDesc.formatString(fieldValue)
			: fieldValue;
	return (
		<>
			<span className={fieldDesc.labelClass}>{fieldDesc.label}</span>
			<input
				name={fieldDesc.name}
				placeholder={fieldDesc.placeholder}
				value={stringValue}
				className={fieldDesc.inputClass ?? options?.inputClass ?? "form-check-input"}
				onChange={onChange}
				pattern={fieldDesc.pattern}
				type={fieldDesc.type ?? "text"}
			/>
		</>
	);
}

function FormTextarea({ formData, fieldDesc, options, onChange }: OneTypeProps) {
	return (
		<>
			<span className={fieldDesc.labelClass}>{fieldDesc.label}</span>
			<textarea
				name={fieldDesc.name}
				value={formData[fieldDesc.name] ?? ""}
				className={fieldDesc.inputClass ?? options?.inputClass ?? "form-check-input"}
				onChange={onChange}
			/>
		</>
	);
}

function FormSelect({ formData, fieldDesc, options, onChange }: OneTypeProps) {
	return (
		<>
			<span className={fieldDesc.labelClass}>{fieldDesc.label}</span>
			<SelectWithOptions
				name={fieldDesc.name}
				value={formData[fieldDesc.name] ?? ""}
				className={fieldDesc.inputClass ?? options?.inputClass ?? "form-check-input"}
				onChange={onChange}
				options={fieldDesc.options}
			/>
		</>
	);
}

function FormRender({ formData, fieldDesc, options, onChange }: OneTypeProps) {
	return (
		<>
			<span className={fieldDesc.labelClass}>{fieldDesc.label}</span>
			{fieldDesc.render!({ fieldDesc, formData, options, onChange })}
		</>
	);
}
