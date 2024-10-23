import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import GoogleIcon from "./Google_Icon";
import Slider from "react-slick";
import { useMediaQuery } from 'react-responsive';
import ReviewButton from "./Button";

const Container = styled.div`
  width: 100%;
  padding: 2rem 0;
  background-color: transparent;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    flex-direction: row;
    padding: 0 3rem;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;

  @media (min-width: 640px) {
    justify-content: flex-start;
  }
`;

const Star = styled(FaStar)`
  color: #fbbf24; /* Yellow color */
  height: 1.25rem;
  width: 1.25rem;
`;

const ReviewInfo = styled.p`
  margin-left: 0.5rem;
  color: #6b7280; /* Gray color */
  font-size: 0.875rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  background-color: #2563eb; /* Blue color */
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e3a8a; /* Darker blue on hover */
  }

  @media (min-width: 640px) {
    margin-top: 0;
  }
`;

const ReviewRow = styled.div`
  display: grid;
  gap: 1.5rem;
  padding: 0 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 3rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ReviewBox = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
`;


const ReviewStars = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ReviewText = styled.p`
  color: #4b5563; /* Text gray */
  margin-bottom: 1rem;
`;

const ReviewerName = styled.p`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const ReviewDate = styled.p`
  color: #6b7280; /* Gray color */
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const ProfilePic = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
`;

function GoogleReviews() {
  const reviews = [
    {
      id: 1,
      text: "Very good service and quality works",
      name: "Reji George",
      date: "Oct 10, 2024",
      profilePic: "https://lh3.googleusercontent.com/a-/ALV-UjXq6YH5AneO2fqyHok7eC_xbg1t9wQzcBoUl90ouZ0t9u04PlnL=w60-h60-p-rp-mo-br100",
    },
    {
      id: 2,
      text: "reliable, efficient and customer-focused.",
      name: "Hassan Sharjeel Joiya",
      date: "Oct 5, 2024",
      profilePic: "https://lh3.googleusercontent.com/a-/ALV-UjWG7y-RMTkmzd_hQlk6tmvNT7Jxzcm9prOIwiljR4awZmnwQaU4=s40-c-rp-mo-br100",
    },
    {
      id: 3,
      text: "Expert staff best service 😊",
      name: "Aisha Saleem",
      date: "Sep 30, 2024",
      profilePic: "https://lh3.googleusercontent.com/a/ACg8ocKSofj69VeZg98lzUtchsAlH_jcck1oc7QfS33ZCVAzduXFMw=s40-c-rp-mo-br100",
    },
    {
      id: 4,
      text: "",
      name: "Ali ALNAKHBI",
      date: "Sep 25, 2024",
      profilePic: "https://lh3.googleusercontent.com/a-/ALV-UjVcHHyXIi7Y7OmkM08uUy9cg9QcNJ-cgLklcMQWrKdw11KA4_Q=s40-c-rp-mo-br100",
    },
  ];

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,  // Adjusts height based on content
  };

  return (
    <Container>
      {/* Header Row */}
      <HeaderRow>
        <div>
          <Title>What Our Customers Say</Title>
          <StarsWrapper>
            {[...Array(5)].map((_, index) => (
              <Star key={index} />
            ))}
            <ReviewInfo>(4.6 based on cummalative reviews)</ReviewInfo>
          </StarsWrapper>
        </div>
        <ReviewButton/>
      </HeaderRow>

      {/* Review Row */}
      {isMobile ? (
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id}>
              <ReviewBox>
                <GoogleIcon />
                <ReviewStars>
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} />
                  ))}
                </ReviewStars>
                <ReviewText>{review.text}</ReviewText>
                <ReviewerName>{review.name}</ReviewerName>
                <ReviewDate>{review.date}</ReviewDate>
                <ProfilePic src={review.profilePic} alt={review.name} />
              </ReviewBox>
            </div>
          ))}
        </Slider>
      ) : (
        <ReviewRow>
          {reviews.map((review) => (
            <ReviewBox key={review.id}>
              <GoogleIcon />
              <ReviewStars>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} />
                ))}
              </ReviewStars>
              <ReviewText>{review.text}</ReviewText>
              <ReviewerName>{review.name}</ReviewerName>
              <ReviewDate>{review.date}</ReviewDate>
              <ProfilePic src={review.profilePic} alt={review.name} />
            </ReviewBox>
          ))}
        </ReviewRow>
      )}
    </Container>
  );
}

export default GoogleReviews;
