import React, { useState, useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (topicTitle: string, topicText: string, topicId?: string) => void;
    editTopic?: {
        topicTitle: string;
        topicText: string;
        topicId: string;
    } | null;
}

const CreateForumTopic: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    editTopic,
}) => {
    const [topicTitle, setTopicTitle] = useState<string>("");
    const [topicText, setTopicText] = useState<string>("");

    useEffect(() => {
        if (editTopic) {
            setTopicTitle(editTopic.topicTitle);
            setTopicText(editTopic.topicText);
        } else {
            setTopicTitle("");
            setTopicText("");
        }
    }, [editTopic]);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(topicTitle, topicText, editTopic?.topicId);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{editTopic ? "Ändra ämne" : "Lägg till nytt ämne"}</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Ämnes title:
                        <input
                            type="text"
                            value={topicTitle}
                            onChange={(e) => setTopicTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        Ämnes Text:
                        <textarea
                            value={topicText}
                            onChange={(e) => setTopicText(e.target.value)}
                        />
                    </label>
                    <button type="submit">Spara</button>
                    <button type="button" onClick={onClose}>
                        Avbryt
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateForumTopic;
