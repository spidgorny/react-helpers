import { ChangeEvent, useState } from "react";

export function useFormData<T extends Record<string, any>>(initialState: T) {
	const [formData, setFormData] = useState<T>(initialState);

	const onChange = (e: ChangeEvent<HTMLInputElement>): Record<string, any> => {
		let newFormData = { ...formData, [e.target.name]: e.target.value };
		setFormData(newFormData);
		return newFormData;
	};

	const onCheck = (e: ChangeEvent<HTMLInputElement>): Record<string, any> => {
		let newFormData = { ...formData, [e.target.name]: e.target.checked };
		setFormData(newFormData);
		return newFormData;
	};

	const getFormData = () => {
		return formData;
	};

	const setFormKey = (key: string, val: any) => {
		setFormData((formData) => ({
			...formData,
			[key]: val,
		}));
	};

	return {
		formData,
		onChange,
		setFormData,
		getFormData,
		setFormKey,
		onCheck,
	};
}
