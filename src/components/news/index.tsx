import React from "react";
import newsImg from "../../assets/logo192.png";

const NEWSMOCK = [
    {
        newsImg: newsImg,
        header: "Killshots",
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing
    elit. Perferendis optio doloremque earum, repellendus
    nesciunt tempore? Voluptatum sed obcaecati, asperiores
    laudantium in tempore quod dolores iste sequi reiciendis
    atque autem nesciunt natus tempora doloribus quas
    adipisci nobis inventore dolorem unde? Temporibus aut
    laudantium necessitatibus doloremque tempora ea quo
    magni ipsum, quae eligendi corrupti nesciunt optio illo
    eveniet esse quasi, officiis distinctio pariatur placeat
    quis architecto asperiores! Sint dicta architecto optio
    quos corporis placeat, similique dolor fugiat culpa
    dolorem, maiores itaque necessitatibus iure animi
    mollitia eum odio minima saepe. Cumque, distinctio?
    Eaque rem nobis laboriosam consequuntur non expedita
    voluptatibus maiores autem veniam?`,
    },
    {
        newsImg: newsImg,
        header: "Styling",
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing
    elit. Perferendis optio doloremque earum, repellendus
    nesciunt tempore? Voluptatum sed obcaecati, asperiores
    laudantium in tempore quod dolores iste sequi reiciendis
    atque autem nesciunt natus tempora doloribus quas
    adipisci nobis inventore dolorem unde? Temporibus aut
    laudantium necessitatibus doloremque tempora ea quo
    magni ipsum, quae eligendi corrupti nesciunt optio illo
    eveniet esse quasi, officiis distinctio pariatur placeat
    quis architecto asperiores! Sint dicta architecto optio
    quos corporis placeat, similique dolor fugiat culpa
    dolorem, maiores itaque necessitatibus iure animi
    mollitia eum odio minima saepe. Cumque, distinctio?
    Eaque rem nobis laboriosam consequuntur non expedita
    voluptatibus maiores autem veniam?`,
    },
    {
        newsImg: newsImg,
        header: "Första Posten",
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing
    elit. Perferendis optio doloremque earum, repellendus
    nesciunt tempore? Voluptatum sed obcaecati, asperiores
    laudantium in tempore quod dolores iste sequi reiciendis
    atque autem nesciunt natus tempora doloribus quas
    adipisci nobis inventore dolorem unde? Temporibus aut
    laudantium necessitatibus doloremque tempora ea quo
    magni ipsum, quae eligendi corrupti nesciunt optio illo
    eveniet esse quasi, officiis distinctio pariatur placeat
    quis architecto asperiores! Sint dicta architecto optio
    quos corporis placeat, similique dolor fugiat culpa
    dolorem, maiores itaque necessitatibus iure animi
    mollitia eum odio minima saepe. Cumque, distinctio?
    Eaque rem nobis laboriosam consequuntur non expedita
    voluptatibus maiores autem veniam?`,
    },
];

const News = () => {
    return (
        <>
            <h2>Nyheter</h2>
            {NEWSMOCK.map((news, i) => (
                <div key={i} className="card">
                    <img src={news.newsImg} alt="nyhetsbild" />
                    <div className="card-info">
                        <h3 className="card-header">{news.header}</h3>
                        <p className="card-text">{news.text}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default News;
