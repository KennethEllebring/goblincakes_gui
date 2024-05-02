import React, { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";

import newsImg from "../../assets/goblinLogo.webp";

interface NewsItem {
    newsImg?: string;
    newsHeader: string;
    newsText: string;
}
const News = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

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
    return (
        <>
            <h2>Nyheter</h2>
            {newsItems.map((news, i) => (
                <div key={i} className="card">
                    <div className="card-img-box">
                        <img
                            src={news.newsImg || newsImg}
                            alt="nyhetsbild"
                            className="card-img"
                        />
                    </div>
                    <div className="card-info">
                        <h3 className="card-header">{news.newsHeader}</h3>
                        <p className="card-text">{news.newsText}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default News;
