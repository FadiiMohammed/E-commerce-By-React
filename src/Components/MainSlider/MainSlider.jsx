import React from "react";
import sliderImg1 from "../../assets/slider-image-1.jpeg";
import sliderImg2 from "../../assets/slider-image-2.jpeg";
import sliderImg3 from "../../assets/slider-image-3.jpeg";
import groceryBanner from "../../assets/grocery-banner.png";
import groceryBanner2 from "../../assets/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="row g-0 mb-5">
        <div className="col-md-8">
          <Slider {...settings}>
            <div>
              <img src={sliderImg1} className="w-100" height="400" alt="" />
            </div>
            <div>
              <img src={sliderImg2} className="w-100" height="400" alt="" />
            </div>
            <div>
              <img src={sliderImg3} className="w-100" height="400" alt="" />
            </div>
          </Slider>
        </div>
        <div className="col-md-4">
          <div>
            <img src={groceryBanner} className="w-100" height="200" alt="" />
            <img src={groceryBanner2} className="w-100" height="200" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
