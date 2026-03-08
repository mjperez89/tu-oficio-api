import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

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

export const ProfessionalProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professional, setProfessional] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3000/professionals/${id}`).then(r => r.json()),
      fetch(`http://localhost:3000/professionals/${id}/reviews`).then(r => r.json()),
    ])
      .then(([proData, reviewData]) => {
        if (proData.professional) {
          setProfessional(proData.professional);
          setReviews(reviewData.reviews || []);
        } else {
          setError("Profesional no encontrado.");
        }
      })
      .catch(() => setError("Error al cargar el perfil."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <><Navbar /><StatusMessage>Cargando...</StatusMessage><Footer /></>;
  if (error)   return <><Navbar /><StatusMessage>{error}</StatusMessage><Footer /></>;

  const image = specialtyImages[professional.specialty] || specialtyImages.default;
  const whatsappUrl = `https://wa.me/54${professional.phoneNumber}?text=Hola%20${professional.firstName},%20te%20contacto%20desde%20TuOficio.com`;

  return (
    <div>
      <Navbar />
      <Wrapper>
        <Card>
          {/* Header */}
          <Header>
            <ProfileImage src={image} alt={professional.specialty} />
            <HeaderInfo>
              <Name>{professional.firstName} {professional.lastName}</Name>
              <SpecialtyBadge>{professional.specialty}</SpecialtyBadge>
              <BackButton onClick={() => navigate(-1)}>← Volver</BackButton>
            </HeaderInfo>
          </Header>

          <Divider />

          {/* Info */}
          <InfoGrid>
            <InfoBlock>
              <InfoIcon>📍</InfoIcon>
              <InfoContent>
                <InfoLabel>Ubicación</InfoLabel>
                <InfoValue>{professional.address}</InfoValue>
              </InfoContent>
            </InfoBlock>

            <InfoBlock>
              <InfoIcon>📞</InfoIcon>
              <InfoContent>
                <InfoLabel>Teléfono</InfoLabel>
                <InfoValue>{professional.phoneNumber}</InfoValue>
              </InfoContent>
            </InfoBlock>

            <InfoBlock>
              <InfoIcon>✉️</InfoIcon>
              <InfoContent>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{professional.email}</InfoValue>
              </InfoContent>
            </InfoBlock>

            {professional.yearsOfExperience && (
              <InfoBlock>
                <InfoIcon>⏱</InfoIcon>
                <InfoContent>
                  <InfoLabel>Años de experiencia</InfoLabel>
                  <InfoValue>{professional.yearsOfExperience} años</InfoValue>
                </InfoContent>
              </InfoBlock>
            )}

            {professional.registrationNumber && (
              <InfoBlock>
                <InfoIcon>🪪</InfoIcon>
                <InfoContent>
                  <InfoLabel>Número de matrícula</InfoLabel>
                  <InfoValue>{professional.registrationNumber}</InfoValue>
                </InfoContent>
              </InfoBlock>
            )}

            <InfoBlock>
              <InfoIcon>👤</InfoIcon>
              <InfoContent>
                <InfoLabel>Usuario</InfoLabel>
                <InfoValue>@{professional.userName}</InfoValue>
              </InfoContent>
            </InfoBlock>
          </InfoGrid>

          <Divider />

          {/* Reseñas */}
          {reviews.length > 0 && (
            <>
              <Divider />
              <ReviewsTitle>⭐ Últimas reseñas</ReviewsTitle>
              <ReviewsGrid>
                {reviews.map((review) => (
                  <ReviewCard key={review.id}>
                    <ReviewHeader>
                      <ReviewClient>{review.clientName}</ReviewClient>
                      <Stars>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Stars>
                    </ReviewHeader>
                    <ReviewComment>"{review.comment}"</ReviewComment>
                    <ReviewDate>
                      {new Date(review.createdAt).toLocaleDateString('es-AR', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </ReviewDate>
                  </ReviewCard>
                ))}
              </ReviewsGrid>
            </>
          )}

          {/* Acciones */}
          <Actions>
            <WhatsAppButton href={whatsappUrl} target="_blank" rel="noreferrer">
              💬 Contactar por WhatsApp
            </WhatsAppButton>
            <EmailButton href={`mailto:${professional.email}`}>
              ✉️ Enviar Email
            </EmailButton>
          </Actions>
        </Card>
      </Wrapper>
      <Footer />
    </div>
  );
};

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 1rem;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 620px;
`;

const Header = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #FF6922;
  flex-shrink: 0;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Name = styled.h1`
  color: #0E2E50;
  font-size: 1.8rem;
  margin: 0;
`;

const SpecialtyBadge = styled.span`
  background-color: #FF6922;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  align-self: flex-start;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #48cae4;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  text-align: left;
  &:hover { text-decoration: underline; }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 1.5rem 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
`;

const InfoIcon = styled.span`
  font-size: 1.3rem;
  margin-top: 2px;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 0.75rem;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
`;

const InfoValue = styled.span`
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const WhatsAppButton = styled.a`
  flex: 1;
  display: block;
  text-align: center;
  background-color: #25D366;
  color: #fff;
  padding: 0.85rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
  &:hover { background-color: #1ebe5d; }
`;

const EmailButton = styled.a`
  flex: 1;
  display: block;
  text-align: center;
  background-color: #0E2E50;
  color: #fff;
  padding: 0.85rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
  &:hover { background-color: #48cae4; }
`;

const StatusMessage = styled.p`
  text-align: center;
  padding: 4rem;
  color: #666;
  font-size: 1.2rem;
`;

const ReviewsTitle = styled.h3`
  color: #0E2E50;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewCard = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
  padding: 1rem;
  border-left: 4px solid #FF6922;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewClient = styled.span`
  font-weight: 700;
  color: #0E2E50;
  font-size: 0.88rem;
`;

const Stars = styled.span`
  color: #FF6922;
  font-size: 0.9rem;
  letter-spacing: 1px;
`;

const ReviewComment = styled.p`
  color: #444;
  font-size: 0.85rem;
  font-style: italic;
  line-height: 1.4;
  margin: 0;
`;

const ReviewDate = styled.span`
  color: #aaa;
  font-size: 0.75rem;
`;
