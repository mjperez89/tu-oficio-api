import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const specialtyImages = {
  Plomero: "/img/plomero.jpeg",
  Electricista: "/img/electricista.jpeg",
  Carpintero: "/img/oficio1.png",
  Albanil: "/img/albanil.jpeg",
  Jardinero: "/img/oficio1.png",
  Gasista: "/img/gasista.jpeg",
  Pintor: "/img/oficio1.png",
  Cerrajero: "/img/cerrajero.jpeg",
  Metalurgico: "/img/metalurgico.jpeg",
  Mecanico: "/img/ferretero.jpeg",
  default: "/img/avatarImage.jpg",
};

const packages = [
  "Lo más popular",
  "Los más recomendados",
  "Según ubicación",
  "Por especialidad",
];

export const Recommend = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTab(active);
  }, [active]);

  const loadTab = async (tab) => {
    setLoading(true);
    try {
      let results = [];

      if (tab === 0) {
        // Lo más popular: búsqueda amplia, shuffle
        const res = await fetch("http://localhost:3000/search?q=a");
        const data = await res.json();
        results = (data.results || []).sort(() => Math.random() - 0.5).slice(0, 6);

      } else if (tab === 1) {
        // Los más recomendados: buscar todos y ordenar por yearsOfExperience como proxy
        const res = await fetch("http://localhost:3000/search?q=a");
        const data = await res.json();
        results = (data.results || [])
          .sort((a, b) => (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0))
          .slice(0, 6);

      } else if (tab === 2) {
        // Según ubicación: buscar por Mendoza
        const res = await fetch("http://localhost:3000/search?q=Mendoza");
        const data = await res.json();
        results = (data.results || []).slice(0, 6);

      } else if (tab === 3) {
        // Por especialidad: 1 de cada tipo
        const specialties = ["Albanil", "Electricista", "Plomero", "Mecanico", "Cerrajero", "Gasista"];
        for (const specialty of specialties) {
          const res = await fetch(`http://localhost:3000/search?q=${specialty}`);
          const data = await res.json();
          if (data.results?.length > 0) results.push(data.results[0]);
        }
      }

      setProfessionals(results);
    } catch (err) {
      console.error("Error cargando recomendados:", err);
    } finally {
      setLoading(false);
    }
  };

  const getImage = (pro) => specialtyImages[pro.specialty] || specialtyImages.default;

  return (
    <Section id="recommend">
      <div className="title">
        <h2>Lo más recomendado</h2>
      </div>

      <div className="packages">
        <ul>
          {packages.map((pkg, index) => (
            <li
              key={index}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
            >
              {pkg}
            </li>
          ))}
        </ul>
      </div>

      <div className="destinations">
        {loading && <LoadingMsg>Cargando...</LoadingMsg>}

        {!loading && professionals.map((pro) => (
          <div
            className="destination"
            key={pro.id}
            onClick={() => navigate(`/professional/${pro.id}`)}
          >
            <img src={getImage(pro)} alt={pro.specialty} />
            <h3>{pro.firstName} {pro.lastName}</h3>
            <p>{pro.specialty} · {pro.address}</p>
            <div className="info">
              <div className="services">
                <img src={"/img/info1.png"} alt="" />
                <img src={"/img/info2.png"} alt="" />
                <img src={"/img/info3.png"} alt="" />
              </div>
              <h4>Ver perfil →</h4>
            </div>
            <div className="distance">
              <span>⏱ {pro.yearsOfExperience || '-'} años exp.</span>
              <span>📍 {pro.address?.split(',')[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const LoadingMsg = styled.p`
  text-align: center;
  color: #666;
  padding: 2rem;
  grid-column: 1 / -1;
`;

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
        cursor: pointer;
        transition: 0.2s;
        &:hover { color: #FF6922; }
      }
      .active {
        border-bottom: 0.5rem solid #FF6922;
        color: #FF6922;
        font-weight: 600;
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
      cursor: pointer;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius: 0.5rem;
      }
      h3 { color: #0E2E50; margin: 0; }
      p { font-size: 0.9rem; color: #555; margin: 0; }
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .services {
          display: flex;
          gap: 0.3rem;
          img {
            border-radius: 1rem;
            background-color: #4d2ddb84;
            width: 2rem;
            height: auto;
            padding: 0.3rem 0.4rem;
          }
        }
        h4 { color: #FF6922; font-size: 0.9rem; margin: 0; }
      }
      .distance {
        display: flex;
        justify-content: space-between;
        font-size: 0.82rem;
        color: #666;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .packages {
      ul {
        li { padding: 0 0.5rem; font-size: 2vh; padding-bottom: 1rem; }
        .active { border-bottom-width: 0.3rem; }
      }
    }
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
`;
