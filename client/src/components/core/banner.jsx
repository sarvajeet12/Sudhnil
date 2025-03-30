import React from "react";
import "./style/banner.css";
import SimpleImageSlider from "react-simple-image-slider";
import { imageBannerAssets } from "../../assets/js/image-assets";

const Banner = () => {
  const images = [
    { url: imageBannerAssets.Banner1 },
    { url: imageBannerAssets.Banner1 },
    { url: imageBannerAssets.Banner1 },
  ];

  return (
    <section className="banner">
      <SimpleImageSlider
        width={"80%"}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </section>
  );
};

export default Banner;
