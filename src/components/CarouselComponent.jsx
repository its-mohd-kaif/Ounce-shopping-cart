import { Card, Carousel } from "@cedcommerce/ounce-ui";
import React from "react";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
function CarouselComponent() {
  return (
    <div>
      <Card>
        <Carousel
          arrowalign="bottomCenter"
          arrows
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          <Card cardType="Bordered" media={img1}></Card>
          <Card cardType="Bordered" media={img2}></Card>
          <Card cardType="Bordered" media={img3}></Card>
        </Carousel>
      </Card>
    </div>
  );
}

export default CarouselComponent;
