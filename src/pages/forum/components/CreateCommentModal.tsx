import React, { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    postId: string;
    onSubmit: (commentText: string, postId: string) => void;
}

const CreateCommentModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    postId,
}) => {
    const [commentText, setCommentText] = useState<string>("");

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(commentText, postId);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" style={{ paddingBottom: "1rem" }}>
            <div className="modal">
                <h2>Comment</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Comment Text:
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCommentModal;
