import React from "react";
import styled from "styled-components";
export const Testimonials = () => {
  return (
    <Section id="testimonials">
      <div className="title">
        <h2>Reseñas</h2>
      </div>
      <div className="testimonials">
        <div className="testimonial">
          <p>
            Excelente atencion y responsabilidad del profesional contactado.
          </p>
          <div className="info">
            <img src={"../img/arquitecta.jpeg"} alt="" />
            <div className="details">
              <h4>Flavia Batistuta</h4>
              <span>Administrativa</span>
            </div>
          </div>
        </div>
        <div className="testimonial">
          <p>
            Se realizó el trabajo pedido en tiempo y forma. Muy recomendable.
          </p>
          <div className="info">
            <img src={"../img/ferretero.jpeg"} alt="" />
            <div className="details">
              <h4>Armando Estebanquito</h4>
              <span>Carpintero</span>
            </div>
          </div>
        </div>
        <div className="testimonial">
          <p>
            Servicio de primer nivel, lo recomendare a mis conocidos y familiares.
          </p>
          <div className="info">
            <img src={"../img/ingeniero_civil.jpeg"} alt="" />
            <div className="details">
              <h4>Eddie Ficio</h4>
              <span>Ingeniero Civil</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 5rem 0;
  .title {
    text-align: center;
    margin-bottom: 2rem;
  }
  .testimonials {
    display: flex;
    justify-content: center;
    margin: 0 2rem;
    gap: 2rem;
    .testimonial {
      background-color: aliceblue;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      .info {
        display: flex;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
        img {
          border-radius: 3rem;
          height: 3rem;
        }
        .details {
          span {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .testimonials {
      flex-direction: column;
      margin: 0;
      .testimonial {
        justify-content: center;
        .info {
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
`;
