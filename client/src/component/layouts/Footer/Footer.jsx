import React, { Component } from 'react';
import styled from 'styled-components';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoLogoTiktok
} from "react-icons/io5";

// Styled component for Footer wrapper
const FooterWrapper = styled.footer`
  width: 100%;
  background: #000;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a, span {
    color: #fff;
    font-size: 0.875rem;
    text-decoration: none;
    margin: 0 10px;
  }

  a:hover {
    text-decoration: underline;
  }

  p {
    color: #fff;
    font-size: 0.75rem;
    margin-top: 20px;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    margin-top: 15px;

    a {
      margin: 0 10px;
      color: inherit;
    }
  }

  @media (max-width: 768px) {
    a, span {
      font-size: 0.75rem;
      margin: 0 5px;
    }

    p {
      font-size: 0.65rem;
    }

    .social-icons a {
      margin: 0 5px;
    }
  }

  @media (max-width: 480px) {
    a, span {
      font-size: 0.65rem;
    }

    p {
      font-size: 0.6rem;
    }

    .social-icons a {
      margin: 0 5px;
    }
  }
`;

class Footer extends Component {
  render() {
    const current_year = new Date().getFullYear();
    return (
      <FooterWrapper id="section_footer">
        <div className="social-icons">
          <a
            href="https://www.facebook.com/fitndrink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoFacebook size={25} style={{ color: '#1877F2' }} />
          </a>
          <a
            href="https://www.instagram.com/fitndrink?igsh=MTJybWhpMGdjd2t3MA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoInstagram size={25} style={{ color: 'red' }} />
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=97431027936&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoWhatsapp size={25} style={{ color: 'green' }} />
          </a>
          <a
            href="https://www.tiktok.com/@fit.drink.trading?fbclid=IwY2xjawGEXFZleHRuA2FlbQIxMAABHTIrYQPNnv18RbfIC6xYkkr-DEeGuzprBtxS7VreMt3PGVNDoqZmsNFnYA_aem_yCtjX4z5Hp6B4ixTEkmxEA"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoTiktok size={25} style={{ color: 'red' }} />
          </a>
        </div>

        <p>Copyright © {current_year}, Created By XenithPulse.com</p>
      </FooterWrapper>
    );
  }
}

export default Footer;
