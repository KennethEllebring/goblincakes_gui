import React, { useState } from "react";
import { fetchData, FetchOptions } from "../../../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

interface Props {
    id?: string;
    newsHeader: string | undefined;
    newsText: string | undefined;
    newsImgUrl: string | undefined;
    closeModal: () => void;
}

const AddEditNews = ({
    id,
    newsHeader,
    newsText,
    newsImgUrl,
    closeModal,
}: Props) => {
    const [header, setHeader] = useState(newsHeader || "");
    const [text, setText] = useState(newsText || "");
    const [imgUrl, setImgUrl] = useState(newsImgUrl || "");

    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeader(e.target.value);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleImgUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImgUrl(e.target.value);
    };

    const handleSave = async () => {
        const payload = {
            newsHeader: header,
            newsText: text,
            imgUrl: imgUrl,
        };

        const url = id
            ? `https://goblincakes-server.vercel.app/api/news/${id}`
            : "https://goblincakes-server.vercel.app/api/news";
        // ? `http://localhost:5050/api/news/${id}`
        // : "http://localhost:5050/api/news";

        const method: "PATCH" | "POST" = id ? "PATCH" : "POST";

        const fetchOptions: FetchOptions = {
            method: method,
            body: JSON.stringify(payload),
            mode: "cors",
            credentials: "include",
        };

        try {
            const response = await fetchData(url, fetchOptions);
            toast.success("Nyhet sparad");
            console.log("Newspost saved successfully:", response);
            closeModal();
        } catch (error) {
            toast.error("Det gick inte att spara nyhet");
            console.error("Error saving news:", error);
        }
    };

    return (
        <div className="add-edit-wrapper">
            <div className="add-edit-header">
                <h1>{id ? "Redigera nyhet" : "Lägg till nyhet"}</h1>
                <button onClick={closeModal} className="x-button">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
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
            </form>
        </div>
    );
};

export default AddEditNews;
