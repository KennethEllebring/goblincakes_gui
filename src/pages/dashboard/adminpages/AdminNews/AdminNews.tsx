import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import newsImg from "../../../../assets/goblinLogo.webp";
import AddEditNews from "./AddEditNews";

interface NewsItem {
    newsImg?: string;
    newsHeader: string;
    newsText: string;
    _id: string;
}

const NewsAdmin = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [currentItem, setCurrentItem] = useState<NewsItem | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data: NewsItem[] = await fetchData<NewsItem[]>(
                    "http://localhost:5050/api/news/all",
                    { method: "GET" },
                );
                setNewsItems(data);
            } catch (error) {
                console.error("Failed to fetch news:", error);
            }
        };

        fetchNews();
    }, []);

    const handleAdd = () => {
        setCurrentItem({ newsImg: "", newsHeader: "", newsText: "", _id: "" }); // Prepare to add new item
        setShowModal(true);
    };

    const handleEdit = (item: NewsItem) => {
        setCurrentItem(item); // Set item to edit
        setShowModal(true);
    };

    const handleDelete = (id: string) => {
        // Placeholder for delete functionality
        console.log("clicked Delete", id);
    };

    const closeModal = () => {
        setShowModal(false);
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
