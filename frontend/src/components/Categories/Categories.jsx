import React from "react";
import styled from "styled-components";

export const Categories = () => {
  const data = [
    {
      icon: "../img/category1.png",
      title: "Hogar",
      subTitle:
        " Encuentre el contratista que necesita y comience hoy el proyecto de renovación de sus sueños..",
    },
    {
      icon: "../img/category2.png",
      title: "Salud",
      subTitle:
        "Todo lo referente a tu salud lo econtras en un solo lugar",
    },
    {
      icon: "../img/category3.png",
      title: "Comercio",
      subTitle:
        " Todas las compras en un solo lugar",
    },
    {
      icon: "../img/category4.png",
      title: "Automotor",
      subTitle:
        " Todo para tu auto",
    },
    {
      icon: "../img/category5.png",
      title: "Alquileres",
      subTitle:
        " Todos los alquileres aqui",
    },
    {
      icon: "../img/category6.png",
      title: "Alquileres",
      subTitle:
        " Todos los alquileres aqui",
    },
    {
      icon: "../img/category7.png",
      title: "Alquileres",
      subTitle:
        " Todos los alquileres aqui",
    },
  ];
  
  return (
    <Section id="categories">
      {data.map((category, index) => {
        return (
          <div className="category">
            <div className="icon">
              <img src={category.icon} alt="" />
            </div>
            <h3>{category.title}</h3>
            <p>{category.subTitle}</p>
          </div>
        );
      })}
    </Section>
  );
}

const Section = styled.section`
  padding: 5rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  .category {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background-color: aliceblue;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: 0.3s ease-in-out;
    &:hover {
      transform: translateX(0.4rem) translateY(-1rem);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    .icon {
      img {
        height: 2.4rem;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
