import React, { useState, useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (
        forumTitle: string,
        categoryTitle: string,
        categoryText: string,
        originalCategoryTitle?: string,
        categoryId?: string,
    ) => void;
    forumTitles: string[];
    editCategory?: {
        forumTitle: string;
        categoryTitle: string;
        categoryText: string;
        categoryId: string;
    } | null;
}

const CreateForumThread: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    forumTitles,
    editCategory,
}) => {
    const [categoryTitle, setCategoryTitle] = useState<string>("");
    const [categoryText, setCategoryText] = useState<string>("");
    const [selectedForumTitle, setSelectedForumTitle] = useState<string>("");
    const [customForumTitle, setCustomForumTitle] = useState<string>("");

    useEffect(() => {
        if (editCategory) {
            setCategoryTitle(editCategory.categoryTitle);
            setCategoryText(editCategory.categoryText);
            setSelectedForumTitle(editCategory.forumTitle);
        } else {
            setCategoryTitle("");
            setCategoryText("");
            setSelectedForumTitle("");
            setCustomForumTitle("");
        }
    }, [editCategory]);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const forumTitle = selectedForumTitle || customForumTitle;
        onSubmit(
            forumTitle,
            categoryTitle,
            categoryText,
            editCategory?.categoryTitle,
            editCategory?.categoryId,
        );
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{editCategory ? "Edit Category" : "Add New Category"}</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Forum Title:
                        <select
                            value={selectedForumTitle}
                            onChange={(e) =>
                                setSelectedForumTitle(e.target.value)
                            }
                            disabled={editCategory !== null}
                        >
                            <option value="">Select an existing forum</option>
                            {forumTitles.map((title, index) => (
                                <option key={index} value={title}>
                                    {title}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Or enter a custom forum title:
                        <input
                            type="text"
                            value={customForumTitle}
                            onChange={(e) =>
                                setCustomForumTitle(e.target.value)
                            }
                            disabled={selectedForumTitle !== ""}
                        />
                    </label>
                    <label>
                        Category Title:
                        <input
                            type="text"
                            value={categoryTitle}
                            onChange={(e) => setCategoryTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        Category Text:
                        <textarea
                            value={categoryText}
                            onChange={(e) => setCategoryText(e.target.value)}
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

export default CreateForumThread;
