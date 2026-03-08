import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 2rem 0;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 480px;
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

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Label = styled.label`
  color: #0E2E50;
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1.5px solid ${({ $error }) => $error ? '#e53935' : '#ccc'};
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

const SectionTitle = styled.h3`
  color: #48cae4;
  font-size: 1rem;
  margin: 1rem 0 0.5rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.4rem;
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

const FieldError = styled.span`
  color: #e53935;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('cliente');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    birthDate: '',
    phoneNumber: '',
    dni: '',
    userName: '',
    registrationNumber: '',
    specialty: '',
    yearsOfExperience: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const validate = () => {
    const errors = {};
    if (!form.firstName) errors.firstName = 'Requerido';
    if (!form.lastName) errors.lastName = 'Requerido';
    if (!form.email) errors.email = 'Requerido';
    if (!form.password) errors.password = 'Requerido';
    if (form.password !== form.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden';
    if (!form.dni) errors.dni = 'Requerido';
    if (!form.userName) errors.userName = 'Requerido';
    if (userType === 'profesional' && !form.specialty) errors.specialty = 'Requerido';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      age: Number(form.age),
      email: form.email,
      password: form.password,
      address: form.address,
      birthDate: form.birthDate,
      phoneNumber: Number(form.phoneNumber),
      dni: Number(form.dni),
      userName: form.userName,
      ...(userType === 'profesional' && {
        registrationNumber: Number(form.registrationNumber),
        specialty: form.specialty,
        yearsOfExperience: Number(form.yearsOfExperience),
      }),
    };

    try {
      const endpoint = userType === 'cliente' ? '/add-client' : '/add-professional';
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.client || data.professional));
        }
        navigate('/login');
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
        <Title>Crear cuenta</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="userType">Tipo de cuenta</Label>
            <Select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="cliente">Cliente</option>
              <option value="profesional">Profesional</option>
            </Select>
          </FormGroup>

          <SectionTitle>Datos personales</SectionTitle>

          <Row>
            <FormGroup>
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Juan"
                $error={fieldErrors.firstName}
              />
              {fieldErrors.firstName && <FieldError>{fieldErrors.firstName}</FieldError>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Perez"
                $error={fieldErrors.lastName}
              />
              {fieldErrors.lastName && <FieldError>{fieldErrors.lastName}</FieldError>}
            </FormGroup>
          </Row>

          <Row>
            <FormGroup>
              <Label htmlFor="dni">DNI</Label>
              <Input
                type="number"
                id="dni"
                name="dni"
                value={form.dni}
                onChange={handleChange}
                placeholder="12345678"
                $error={fieldErrors.dni}
              />
              {fieldErrors.dni && <FieldError>{fieldErrors.dni}</FieldError>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="age">Edad</Label>
              <Input
                type="number"
                id="age"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="25"
              />
            </FormGroup>
          </Row>

          <Row>
            <FormGroup>
              <Label htmlFor="birthDate">Fecha de nacimiento</Label>
              <Input
                type="date"
                id="birthDate"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phoneNumber">Teléfono</Label>
              <Input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="2615551234"
              />
            </FormGroup>
          </Row>

          <FormGroup>
            <Label htmlFor="address">Dirección</Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Mendoza, Argentina"
            />
          </FormGroup>

          <SectionTitle>Cuenta</SectionTitle>

          <FormGroup>
            <Label htmlFor="userName">Nombre de usuario</Label>
            <Input
              type="text"
              id="userName"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              placeholder="jperez"
              $error={fieldErrors.userName}
            />
            {fieldErrors.userName && <FieldError>{fieldErrors.userName}</FieldError>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              $error={fieldErrors.email}
            />
            {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
          </FormGroup>

          <Row>
            <FormGroup>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                $error={fieldErrors.password}
              />
              {fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                $error={fieldErrors.confirmPassword}
              />
              {fieldErrors.confirmPassword && <FieldError>{fieldErrors.confirmPassword}</FieldError>}
            </FormGroup>
          </Row>

          {userType === 'profesional' && (
            <>
              <SectionTitle>Datos profesionales</SectionTitle>

              <FormGroup>
                <Label htmlFor="specialty">Especialidad</Label>
                <Select
                  id="specialty"
                  name="specialty"
                  value={form.specialty}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar especialidad</option>
                  <option value="Plomero">Plomero</option>
                  <option value="Electricista">Electricista</option>
                  <option value="Carpintero">Carpintero</option>
                  <option value="Albanil">Albañil</option>
                  <option value="Jardinero">Jardinero</option>
                  <option value="Gasista">Gasista</option>
                  <option value="Pintor">Pintor</option>
                  <option value="Cerrajero">Cerrajero</option>
                  <option value="Soldador">Soldador</option>
                </Select>
                {fieldErrors.specialty && <FieldError>{fieldErrors.specialty}</FieldError>}
              </FormGroup>

              <Row>
                <FormGroup>
                  <Label htmlFor="registrationNumber">Número de matrícula</Label>
                  <Input
                    type="number"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    placeholder="12345"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="yearsOfExperience">Años de experiencia</Label>
                  <Input
                    type="number"
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    value={form.yearsOfExperience}
                    onChange={handleChange}
                    placeholder="5"
                  />
                </FormGroup>
              </Row>
            </>
          )}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Crear cuenta'}
          </SubmitButton>

          <SecondaryButton to="/login">¿Ya tenés cuenta? Iniciá sesión</SecondaryButton>
        </form>
      </Card>
    </Wrapper>
  );
};
