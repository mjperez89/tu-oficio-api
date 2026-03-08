import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto 1.5rem;
  width: 160px;
`;

const Title = styled.h2`
  color: #0E2E50;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  color: #0E2E50;
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #FF6922;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #FF6922;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #FF6922;
  color: #fff;
  padding: 0.85rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e55a10;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 0.8rem;
  padding: 0.75rem;
  border: 1.5px solid #0E2E50;
  border-radius: 8px;
  color: #0E2E50;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: #0E2E50;
    color: #fff;
  }
`;

const ErrorMessage = styled.p`
  color: #e53935;
  background: #fdecea;
  border-radius: 6px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('cliente');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = userType === 'cliente' ? '/login-client' : '/login-professional';
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.client || data.professional));
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error de conexión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Logo src="/img/tuoficio_logo.png" alt="Tu Oficio" />
        <Title>Iniciar sesión</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="userType">Tipo de usuario</Label>
            <Select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="cliente">Cliente</option>
              <option value="profesional">Profesional</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </SubmitButton>

          <SecondaryButton to="/signup">Crear cuenta</SecondaryButton>
          <SecondaryButton to="/">Volver al inicio</SecondaryButton>
        </form>
      </Card>
    </Wrapper>
  );
};
