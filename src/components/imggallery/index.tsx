import React from "react";
import Slider from "react-slick";
import killshot1 from "../../assets/killshot1.jpg";
import killshot2 from "../../assets/killshot2.jpg";
import killshot3 from "../../assets/killshot3.jpg";
import killshot4 from "../../assets/killshot4.jpg";
import killshot5 from "../../assets/killshot5.jpg";
import killshot6 from "../../assets/killshot6.jpg";
import killshot7 from "../../assets/killshot7.jpg";
import killshot8 from "../../assets/killshot8.jpg";
import killshot9 from "../../assets/killshot9.jpg";
import killshot10 from "../../assets/killshot10.jpg";

// Import CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const IMAGEMOCK = [
    killshot1,
    killshot2,
    killshot3,
    killshot4,
    killshot5,
    killshot6,
    killshot7,
    killshot8,
    killshot9,
    killshot10,
];

const ImgGallery = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="img-slider-wrapper">
            <Slider {...settings}>
                {IMAGEMOCK.map((img, i) => (
                    <div key={i} className="img-slider">
                        <img src={img} alt={`Slide ${i}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImgGallery;
