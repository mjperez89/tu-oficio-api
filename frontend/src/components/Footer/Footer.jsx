import React from "react";
import styled from "styled-components";
import { BsLinkedin, BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
export const Footer = () => {
  return (
    <FooterContainer>
      <span>Copyright &copy; Tu Oficio 2023 </span>
      <ul className="links">
        <li>
          <a href="#hero">Home</a>
        </li>
        <li>
          <a href="#categories">Categorias</a>
        </li>
        <li>
          <a href="#recommend">Explorar</a>
        </li>
        <li>
          <a href="#testimonials">Reseñas</a>
        </li>
      </ul>
      <ul className="social__links">
  <li>
    <a href="https://wwww.facebook.com">
      <BsFacebook />
    </a>
  </li>
  <li>
    <a href="https://www.instagram.com">
      <AiFillInstagram />
    </a>
  </li>
  <li>
    <a href="https://www.linkedin.com">
      <BsLinkedin />
    </a>
  </li>
</ul>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-evenly;
  background-color: #d0d8ff;
  border-radius: 0.5rem;
  padding: 2.5rem;

  ul {
    display: flex;
    list-style-type: none;
    gap: 2rem;
    li {
      a {
        text-decoration: none;
        color: black;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #302ce9;
        }
      }
      svg {
        font-size: 1.3rem;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #302ce9;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    ul {
      flex-direction: column;
    }
    .social__links {
      flex-direction: row;
    }
  }
`;
