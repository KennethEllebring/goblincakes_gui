import React from "react";
import ImgGallery from "../../components/imggallery";
import News from "../../components/news";

const Home = () => {
    return (
        <>
            <ImgGallery />
            <div className="home-wrapper">
                <div className="content">
                    <section className="news">
                        <News />
                    </section>
                </div>
            </div>
        </>
    );
};

export default Home;
