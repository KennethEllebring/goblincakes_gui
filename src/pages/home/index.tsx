import React from "react";
import ImgGallery from "../../components/imggallery";
import News from "../../components/news";

const Home = () => {
    return (
        <>
            <ImgGallery />

            <main className="home">
                <div className="content">
                    <section className="news">
                        <News />
                    </section>
                </div>
            </main>
        </>
    );
};

export default Home;
