import React, { useState, useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (postTitle: string, postText: string, postId?: string) => void;
    editPost?: {
        post_title: string;
        post_text: string;
        post_id: string;
    } | null;
}

const CreatePostModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    editPost,
}) => {
    const [postTitle, setPostTitle] = useState<string>("");
    const [postText, setPostText] = useState<string>("");

    useEffect(() => {
        if (editPost) {
            setPostTitle(editPost.post_title);
            setPostText(editPost.post_text);
        } else {
            setPostTitle("");
            setPostText("");
        }
    }, [editPost]);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(postTitle, postText, editPost?.post_id);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{editPost ? "Edit Post" : "Add New Post"}</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Post Title:
                        <input
                            type="text"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        Post Text:
                        <textarea
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
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

export default CreatePostModal;
