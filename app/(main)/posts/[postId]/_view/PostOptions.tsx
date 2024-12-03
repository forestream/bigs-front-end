"use client";

import { BASE_URL } from "@/lib/constants";
import styles from "../page.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function PostOptions({ postId }: { postId: string }) {
	const router = useRouter();

	const handleEdit = () => router.push(`/posts/${postId}/edit`);

	const handleDelete = async () => {
		try {
			const response = await fetch(`${BASE_URL}/api/boards/${postId}`, {
				method: "DELETE",
			});

			if (!response.ok) throw response;

			alert("글이 삭제되었습니다.");
			router.push("/posts");
		} catch {}
	};

	const [isOpen, setIsOpen] = useState(false);
	const handleIsOpen = (isOpen: boolean) => setIsOpen(isOpen);

	return (
		<>
			<div className={styles.options}>
				<button onClick={handleEdit}>수정</button>
				<button onClick={() => handleIsOpen(true)}>삭제</button>
			</div>
			<Modal isOpen={isOpen}>
				<Modal.Overlay>
					<Modal.Content className={styles.modalContent}>
						<p>게시글을 지우시겠습니까?</p>
						<p>삭제된 글은 복구할 수 없습니다.</p>
						<div className={styles.modalButtons}>
							<button className={styles.modalButton} onClick={handleDelete}>
								삭제
							</button>
							<button
								className={styles.modalButton}
								onClick={() => handleIsOpen(false)}
							>
								취소
							</button>
						</div>
					</Modal.Content>
				</Modal.Overlay>
			</Modal>
		</>
	);
}
