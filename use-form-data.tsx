import { useState } from "react";

export function useFormData(initialState) {
	const [formData, setFormData] = useState<Record<string, any>>(initialState);

	const onChange = (e): Record<string, any> => {
		let newFormData = { ...formData, [e.target.name]: e.target.value };
		setFormData(newFormData);
		return newFormData;
	};

	const onCheck = (e): Record<string, any> => {
		let newFormData = { ...formData, [e.target.name]: e.target.checked };
		setFormData(newFormData);
		return newFormData;
	};

	const getFormData = () => {
		return formData;
	};

	const setFormKey = (key: string, val: any) => {
		setFormData({
			...formData,
			[key]: val,
		});
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
