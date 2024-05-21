import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import newsImg from "../../../../assets/goblinLogo.webp";
import AddEditNews from "./AddEditNews";

interface NewsItem {
    newsImg?: string;
    newsHeader: string;
    newsText: string;
    _id: string;
    created: string;
}

const NewsAdmin = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [currentItem, setCurrentItem] = useState<NewsItem | null>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchNews = async () => {
        try {
            const data: NewsItem[] = await fetchData<NewsItem[]>(
                "http://localhost:5050/api/news/all",
                { method: "GET" },
            );
            data.sort(
                (a, b) =>
                    new Date(b.created).getTime() -
                    new Date(a.created).getTime(),
            );
            setNewsItems(data);
        } catch (error) {
            console.error("Failed to fetch news:", error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleAdd = () => {
        setCurrentItem({
            newsImg: "",
            newsHeader: "",
            newsText: "",
            _id: "",
            created: "",
        });
        setShowModal(true);
    };

    const handleEdit = (item: NewsItem) => {
        setCurrentItem(item);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        try {
            const response: Response = await fetch(
                `http://localhost:5050/api/news/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                },
            );

            if (response.ok) {
                toast.success("Nyheten borttagen");
                console.log("Newspost deleted successfully");
                setNewsItems(newsItems.filter((item) => item._id !== id));
            } else {
                toast.error("Det gick inte att ta bort nyheten");
                console.error(
                    "Failed to delete newspost:",
                    response.statusText,
                );
            }
        } catch (error) {
            toast.error("Det gick inte att ta bort nyheten");
            console.error("Failed to delete news post:", error);
        }
    };

    const closeModal = async () => {
        setShowModal(false);
        await fetchNews();
    };

    return (
        <>
            <div className="admin-news">
                <div className="admin-news-header">
                    <h2>NYHETER</h2>
                    <button onClick={handleAdd}>LÄGG TILL</button>
                </div>
                {showModal && currentItem && (
                    <AddEditNews
                        id={currentItem._id}
                        newsHeader={currentItem.newsHeader}
                        newsText={currentItem.newsText}
                        newsImgUrl={currentItem.newsImg}
                        closeModal={closeModal}
                    />
                )}
                {newsItems.map((news) => (
                    <div key={news._id} className="outer-card">
                        <div className="inner-card">
                            <div className="card-img-box">
                                <img
                                    src={news.newsImg || newsImg}
                                    alt="nyhetsbild"
                                    className="card-img"
                                />
                            </div>
                            <div className="card-info">
                                <h3 className="card-header">
                                    {news.newsHeader}
                                </h3>
                                <p className="card-text">{news.newsText}</p>
                            </div>
                        </div>
                        <div className="admin-news-settings">
                            <button
                                className="edit-button"
                                onClick={() => handleEdit(news)}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(news._id)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default NewsAdmin;
