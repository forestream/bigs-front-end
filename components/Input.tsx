"use client";

import { ChangeEventHandler, ComponentPropsWithoutRef, useState } from "react";

export default function Input({
	type = "text",
	initValue,
	...props
}: Omit<ComponentPropsWithoutRef<"input">, "type"> & {
	type?: "text" | "password" | "email";
	initValue?: string;
}) {
	const [value, setValue] = useState(initValue ?? "");

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
		setValue(e.target.value);

	return <input type={type} value={value} onChange={handleChange} {...props} />;
}
