"use client";

import { useState } from "react";

export function useStateObj<T>(defaultValue: T | undefined = undefined): StateObj<T> {
	const [value, set] = useState<T | undefined>(defaultValue);
	const increment = () => {
		set((v) => {
			if (typeof v !== "number") {
				return v;
			}
			return (v + 1) as T;
		});
	};
	const decrement = () => {
		typeof value === "number" &&
			set((v) => {
				if (typeof v !== "number") {
					return v;
				}
				return (v - 1) as T;
			});
	};
	const setTrue = () => {
		typeof value === "boolean" && set(true as T);
	};
	const setFalse = () => set(false as T);
	const reset = () => set(defaultValue as T);
	const toggle = () => set(!value as T);
	const append = (item: T) => {
		// console.log("append", item, "to", (value as string[]).length, "rows");
		set((value) => [...(value as T[]), item] as T);
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		set(event.target.value as T);
	};
	const onChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
		set(event.target.checked as T);
	};
	const setCallback = (setter: (oldValue: T | undefined) => T) => {
		set(setter);
	};

	return {
		value,
		set,
		setCallback,
		increment,
		decrement,
		setTrue,
		setFalse,
		reset,
		toggle,
		onChange,
		onChecked,
		append,
	};
}

export interface StateObj<T> {
	value: T | undefined;
	set: (value: T) => void;
	setCallback: (setter: (oldValue: T | undefined) => T) => void;
	increment: () => void;
	decrement: () => void;
	setTrue: () => void;
	setFalse: () => void;
	reset: () => void;
	toggle: () => void;
	append: (item: T) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
