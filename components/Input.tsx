"use client";

import { ChangeEventHandler, ComponentPropsWithoutRef, useState } from "react";

export default function Input({
	type = "text",
	...props
}: Omit<ComponentPropsWithoutRef<"input">, "type"> & {
	type?: "text" | "password" | "email";
}) {
	const [value, setValue] = useState("");

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
		setValue(e.target.value);

	return <input type={type} value={value} onChange={handleChange} {...props} />;
}
