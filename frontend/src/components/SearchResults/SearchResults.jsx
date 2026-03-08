import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';

const specialtyImages = {
  Plomero: "/img/plomero.jpeg",
  Electricista: "/img/electricista.jpeg",
  Carpintero: "/img/oficio1.png",
  Albanil: "/img/albanil.jpeg",
  Jardinero: "/img/oficio1.png",
  Gasista: "/img/gasista.jpeg",
  Pintor: "/img/oficio1.png",
  Cerrajero: "/img/cerrajero.jpeg",
  Soldador: "/img/metalurgico.jpeg",
  default: "/img/avatarImage.jpg",
};

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const query = searchParams.get('q') || '';

  useEffect(() => {
    setSearchInput(query);
    if (query) fetchResults(query);
  }, [query]);

  const fetchResults = async (q) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(q)}`);
      const data = await response.json();
      setProfessionals(data.results || []);
    } catch (err) {
      console.error('Error al buscar:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/searchResults?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const getImage = (professional) => {
    return specialtyImages[professional.specialty] || specialtyImages.default;
  };

  return (
    <div>
      <ScrollToTop />
      <Navbar />

      <Section>
        {/* Barra de búsqueda */}
        <SearchBar onSubmit={handleSearch}>
          <SearchInput
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar profesional, especialidad..."
          />
          <SearchButton type="submit">Buscar</SearchButton>
        </SearchBar>

        <ResultsTitle>
          {query
            ? `Profesionales para "${query}" (${professionals.length} resultados)`
            : 'Todos los profesionales'}
        </ResultsTitle>

        <Content>
          {/* Lista de resultados */}
          <ResultsList>
            {loading && <StatusMessage>Buscando...</StatusMessage>}

            {!loading && professionals.length === 0 && (
              <StatusMessage>No se encontraron profesionales para tu búsqueda.</StatusMessage>
            )}

            {!loading && professionals.map((pro) => (
              <ProfessionalCard key={pro.id}>
                <CardImage src={getImage(pro)} alt={pro.specialty} />
                <CardBody>
                  <CardName>{pro.firstName} {pro.lastName}</CardName>
                  {pro.specialty && <CardSpecialty>{pro.specialty}</CardSpecialty>}
                  <CardInfo>
                    <InfoItem>📍 {pro.address}</InfoItem>
                    {pro.yearsOfExperience && (
                      <InfoItem>⏱ {pro.yearsOfExperience} años de experiencia</InfoItem>
                    )}
                    <InfoItem>📞 {pro.phoneNumber}</InfoItem>
                  </CardInfo>
                  <ContactButton href={`mailto:${pro.email}`}>
                    Contactar
                  </ContactButton>
                </CardBody>
              </ProfessionalCard>
            ))}
          </ResultsList>

          {/* Mapa */}
          <MapContainer>
            <MapImage src="/img/mapa.jpg" alt="Mapa de resultados" />
          </MapContainer>
        </Content>
      </Section>

      <Footer />
    </div>
  );
};

const Section = styled.section`
  padding: 2rem 4%;
  min-height: 70vh;
`;

const SearchBar = styled.form`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  max-width: 600px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #FF6922;
  }
`;

const SearchButton = styled.button`
  background-color: #FF6922;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e55a10;
  }
`;

const ResultsTitle = styled.h2`
  color: #0E2E50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ResultsList = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StatusMessage = styled.p`
  color: #666;
  text-align: center;
  padding: 2rem;
`;

const ProfessionalCard = styled.div`
  display: flex;
  gap: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  }
`;

const CardImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`;

const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const CardName = styled.h3`
  color: #0E2E50;
  font-size: 1rem;
  margin: 0;
`;

const CardSpecialty = styled.span`
  background-color: #FF6922;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  align-self: flex-start;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.3rem;
`;

const InfoItem = styled.span`
  font-size: 0.82rem;
  color: #555;
`;

const ContactButton = styled.a`
  margin-top: 0.5rem;
  align-self: flex-start;
  background-color: #0E2E50;
  color: #fff;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #48cae4;
  }
`;

const MapContainer = styled.div`
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  position: sticky;
  top: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    position: static;
  }
`;

const MapImage = styled.img`
  width: 100%;
  height: 520px;
  object-fit: cover;
  display: block;
`;
