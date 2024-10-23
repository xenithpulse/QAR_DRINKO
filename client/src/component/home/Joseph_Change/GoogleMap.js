// components/GoogleMap.js
import React from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  margin-top: 30px;

  iframe {
    width: 100%;
    height: 500px;
    border: 0;

    @media (min-width: 640px) {
      width: 90%;
    }

    @media (min-width: 1024px) {
      width: 80%;
    }
  }
`;

const GoogleMap = () => {
  return (
    <MapContainer>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.089904445906!2d51.51690267610433!3d25.267560928845686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c5c24fcc12d9%3A0x14b3d5f9184fbe63!2sFit%20and%20Drink!5e0!3m2!1sen!2s!4v1729527430209!5m2!1sen!2s"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </MapContainer>
  );
};

export default GoogleMap;
