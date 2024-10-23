import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import Center from "./centered";

const CarouselContainer = styled.div`
  margin-top: auto;
  width: 100%;
  max-width: 1200px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -70px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0; 
  }
`;

const TopCarouselsWrapper = styled.div`
  display: flex;
  gap: 7px;
  width: 100%;
  margin-bottom: -75px;

  @media (max-width: 768px) {
    display: none; /* Hide this row on smaller screens */
  }
`;

const TopCarousel = styled.div`
  width: calc(50% - 3.5px);
  height: 405px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const BottomCarousel = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none; /* Hide this on smaller screens */
  }
`;

const CarouselImage = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ResponsiveCarouselWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

const MultiCarousel = () => {
  const images = [
    "https://res.cloudinary.com/dcsk6j16i/image/upload/v1729590811/nioztfujzozneywtwgrg.png",
    "https://res.cloudinary.com/dcsk6j16i/image/upload/v1729590807/kre4vvjjx4ahvr5cvn0c.png",
    "https://res.cloudinary.com/dcsk6j16i/image/upload/v1729590815/ep6nttax3r1zh1tpzkor.png",
  ];

  return (
    <Center>
      <CarouselContainer>
        {/* Top Row with Two Images */}
        <TopCarouselsWrapper>
          <TopCarousel>
            <CarouselImage>
              <img src={images[0]} alt="image1" />
            </CarouselImage>
          </TopCarousel>
          <TopCarousel>
            <CarouselImage>
              <img src={images[1]} alt="image2" />
            </CarouselImage>
          </TopCarousel>
        </TopCarouselsWrapper>

        {/* Bottom Row with One Image */}
        <BottomCarousel>
          <CarouselImage>
            <img src={images[2]} alt="image3" />
          </CarouselImage>
        </BottomCarousel>

        {/* Responsive Carousel for Smaller Devices */}
        <ResponsiveCarouselWrapper>
          <Carousel
            showArrows={true}
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            interval={6000}
            stopOnHover={false}
            showIndicators={true}
          >
            {images.map((image, index) => (
              <CarouselImage key={index}>
                <img src={image} alt={`image${index + 1}`} />
              </CarouselImage>
            ))}
          </Carousel>
        </ResponsiveCarouselWrapper>
      </CarouselContainer>
    </Center>
  );
};

export default MultiCarousel;
