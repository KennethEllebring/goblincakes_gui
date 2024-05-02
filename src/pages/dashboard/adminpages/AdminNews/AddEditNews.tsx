import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
    newsHeader: string | undefined;
    newsText: string | undefined;
    newsImgUrl: string | undefined;
    closeModal: () => void;
}

const AddEditNews = ({
    newsHeader,
    newsText,
    newsImgUrl,
    closeModal,
}: Props) => {
    const [header, setHeader] = useState(newsHeader || "");
    const [text, setText] = useState(newsText || "");
    const [imgUrl, setImgUrl] = useState(newsImgUrl || "");

    const handleHeaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeader(event.target.value);
    };

    const handleTextChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setText(event.target.value);
    };

    const handleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImgUrl(event.target.value);
    };

    return (
        <div className="add-edit-wrapper">
            <div className="add-edit-header">
                <h1>{newsHeader ? "Redigera nyhet" : "Lägg till nyhet"}</h1>
                <button onClick={closeModal} className="x-button">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <form action="submit">
                <input
                    className="img-url"
                    type="text"
                    value={imgUrl}
                    onChange={handleImgUrlChange}
                    placeholder="bild URL"
                />

                <div className="text-wrapper">
                    <input
                        type="text"
                        value={header}
                        onChange={handleHeaderChange}
                        placeholder="Överskrift"
                    />
                    <textarea
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Nyhetstext"
                    ></textarea>
                </div>
            </form>
            <div className="add-edit-buttons">
                <button type="submit" className="save-button">
                    SPARA
                </button>
                <button
                    type="button"
                    className="cancel-button"
                    onClick={closeModal}
                >
                    AVBRYT
                </button>
            </div>
        </div>
    );
};

export default AddEditNews;
