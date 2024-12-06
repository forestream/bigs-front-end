"use client";

import { ChangeEventHandler, ComponentPropsWithoutRef, useState } from "react";

export default function Textarea({
	initValue,
	...props
}: ComponentPropsWithoutRef<"textarea"> & { initValue?: string }) {
	const [value, setValue] = useState(initValue ?? "");

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
		setValue(e.target.value);

	return <textarea value={value} onChange={handleChange} {...props} />;
}
