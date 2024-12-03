"use client";

import styles from "./Modal.module.scss";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
	isOpen: boolean;
};

export default function Modal({
	isOpen,
	children,
}: PropsWithChildren<ModalProps>) {
	return <>{isOpen && createPortal(<>{children}</>, document.body)};</>;
}

function ModalOverlay({ children }: PropsWithChildren) {
	return <div className={styles.overlay}>{children}</div>;
}

function ModalContent({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<"div">) {
	return (
		<div className={styles.contentContainer}>
			<div className={`${styles.content} ${className}`} {...props}>
				{children}
			</div>
		</div>
	);
}

Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
