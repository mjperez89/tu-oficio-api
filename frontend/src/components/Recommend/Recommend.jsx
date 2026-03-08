import React, { useState } from "react";
import styled from "styled-components";
export const Recommend = () => {
  const data = [
    {
      image: "../img/cerrajero.jpeg",
      title: "Cerrajero",
      subTitle: "Soy un cerrajero experimentado que se especializa en solucionar problemas de cerrajería. Brindo servicios confiables de apertura, reparación y reemplazo de cerraduras para garantizar la seguridad de mis clientes",
      cost: "$10000",
      duration: "Calificacion",
    },
    {
      image: "../img/plomero.jpeg",
      title: "Plomero",
      subTitle: "Soy un plomero con experiencia en instalación y reparación de fontanería, listo para solucionar tus problemas de agua y tuberías de manera eficiente.",
      cost: "$54200",
      duration: "Calificacion",
    },
    {
      image: "../img/gasista.jpeg",
      title: "Gasista",
      subTitle: "Soy un gasista con experiencia en instalación y mantenimiento de sistemas de gas para tu tranquilidad y seguridad.",
      cost: "$45500",
      duration: "Calificacion",
    },
    {
      image: "../img/electricista.jpeg",
      title: "Electricista",
      subTitle: "Soy un electricista experto en instalación y reparación de sistemas eléctricos para hogares y negocios, garantizando seguridad y eficiencia.",
      cost: "$24100",
      duration: "Calificacion",
    },
    {
      image: "../img/metalurgico.jpeg",
      title: "Metalurgico",
      subTitle: "Soy un metalúrgico con experiencia en trabajar con metales para crear productos duraderos y de calidad.",
      cost: "$95400",
      duration: "Calificacion",
    },
    {
      image: "../img/albañil.jpeg",
      title: "Albañil",
      subTitle: "Soy un albañil con experiencia en construcción y renovación, enfocado en crear estructuras sólidas y acabados de calidad",
      cost: "$38800",
      duration: "Calificacion",
    },
  ];

  const packages = [
    "Lo mas popular",
    "Los mas recomentados",
    "Según ubicación ",
    "Por precios",
  ];

  const [active, setActive] = useState(1);
  return (
    <Section id="recommend">
      <div className="title">
        <h2>Lo más recomendado</h2>
      </div>
      <div className="packages">
        <ul>
          {packages.map((pkg, index) => {
            return (
              <li
                className={active === index + 1 ? "active" : ""}
                onClick={() => setActive(index + 1)}
              >
                {pkg}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="destinations">
        {data.map((destination) => {
          return (
            <div className="destination">
              <img src={destination.image} alt="" />
              <h3>{destination.title}</h3>
              <p>{destination.subTitle}</p>
              <div className="info">
                <div className="services">
                  <img src={"../img/info1.png"} alt="" />
                  <img src={"../img/info2.png"} alt="" />
                  <img src={"../img/info3.png"} alt="" />
                </div>
                <h4>{destination.cost}</h4>
              </div>
              <div className="distance">
                <span>100 Puntos</span>
                <span>{destination.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  padding: 2rem 0;
  .title {
    text-align: center;
  }
  .packages {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    ul {
      display: flex;
      list-style-type: none;
      width: max-content;
      li {
        padding: 1rem 2rem;
        border-bottom: 0.1rem solid black;
      }
      .active {
        border-bottom: 0.5rem solid #8338ec;
      }
    }
  }
  .destinations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 0 3rem;
    .destination {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: #8338ec14;
      border-radius: 1rem;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      img {
        width: 100%;
      }
      .info {
        display: flex;
        align-items: center;
        .services {
          display: flex;
          gap: 0.3rem;
          img {
            border-radius: 1rem;
            background-color: #4d2ddb84;
            width: 2rem;
            /* padding: 1rem; */
            padding: 0.3rem 0.4rem;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .distance {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .packages {
      ul {
        li {
          padding: 0 0.5rem;
          font-size: 2vh;
          padding-bottom: 1rem;
        }
        .active {
          border-bottom-width: 0.3rem;
        }
      }
    }
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
`;
