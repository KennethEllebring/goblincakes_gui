import React from "react";
import Slider from "react-slick";

// Import CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import all images manually
import anduin from "../../assets/killshots/anduin.jpg";
import artificerXymoxHeroic from "../../assets/killshots/artificer-xymox-heroic.jpg";
import councilHc from "../../assets/killshots/council-hc.jpg";
import councilMythic from "../../assets/killshots/council-mythic.jpg";
import councilOfDreamsHeroic from "../../assets/killshots/council-of-dreams-heroic.jpg";
import datheaHc from "../../assets/killshots/dathea-hc.jpg";
import fyrakkHeroic from "../../assets/killshots/fyrakk-heroic.jpg";
import halondrus from "../../assets/killshots/halondrus.jpg";
import hungeringDestroyer from "../../assets/killshots/hungering-destroyer.jpg";
import huntsmanAltimor from "../../assets/killshots/huntsman-altimor.jpg";
import jailer from "../../assets/killshots/jailer.jpg";
import kurogHc from "../../assets/killshots/kurog-hc.jpg";
import ladyInervaDarkveinHeroic from "../../assets/killshots/lady-inerva-darkvein-heroic.jpg";
import larodarKeeperOfTheFlameHeroic from "../../assets/killshots/larodar-keeper-of-the-flame-heroic.jpg";
import lords from "../../assets/killshots/lords.jpg";
import nymueWeaverOfTheCycleHeroic from "../../assets/killshots/nymue-weaver-of-the-cycle-heroic.jpg";
import prototype from "../../assets/killshots/prototype.jpg";
import raszagethHc from "../../assets/killshots/raszageth-hc.jpg";
import rygelon from "../../assets/killshots/rygelon.jpg";
import sennarthHc from "../../assets/killshots/sennarth-hc.jpg";
import sireDenathriusHeroic from "../../assets/killshots/sire-denathrius-heroic.jpg";
import skolexTheInsatiableRavener from "../../assets/killshots/skolex-the-insatiable-ravener.jpg";
import sludgefistHeroic from "../../assets/killshots/sludgefist-heroic.jpg";
import stoneLegionHeroic from "../../assets/killshots/stone-legion-heroic.jpg";
import sunKingsSalvationHeroic from "../../assets/killshots/sun-kings-salvation-heroic.jpg";
import terrosHc from "../../assets/killshots/terros-hc.jpg";
import tindralSageswiftHeroic from "../../assets/killshots/tindral-sageswift-heroic.jpg";
import vigilantGuardianHc from "../../assets/killshots/vigilant-guardian-hc.jpg";

const images = [
    anduin,
    artificerXymoxHeroic,
    councilHc,
    councilMythic,
    councilOfDreamsHeroic,
    datheaHc,
    fyrakkHeroic,
    halondrus,
    hungeringDestroyer,
    huntsmanAltimor,
    jailer,
    kurogHc,
    ladyInervaDarkveinHeroic,
    larodarKeeperOfTheFlameHeroic,
    lords,
    nymueWeaverOfTheCycleHeroic,
    prototype,
    raszagethHc,
    rygelon,
    sennarthHc,
    sireDenathriusHeroic,
    skolexTheInsatiableRavener,
    sludgefistHeroic,
    stoneLegionHeroic,
    sunKingsSalvationHeroic,
    terrosHc,
    tindralSageswiftHeroic,
    vigilantGuardianHc,
];

const ImgGallery: React.FC = () => {
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
                {images.map((src, i) => (
                    <div key={i} className="img-slider">
                        <img src={src} alt={`Slide ${i}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImgGallery;
