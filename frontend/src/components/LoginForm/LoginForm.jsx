import React, { useState } from 'react';
import { Link } from 'react-router-dom'

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('cliente');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
      userType: userType
    };

    try {
      let response;
      if (userType === 'cliente') {
        response = await fetch('http://localhost:3000/login-client', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
      } else if (userType === 'profesional') {
        response = await fetch('http://localhost:3000/login-professional', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
      }
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        window.alert(data.message);
        window.location.href = "/";
        setLoggedIn(true)
      } else {
        window.alert(data.message);
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  if (loggedIn) {
    return <Link to="/" />;
  }

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userType">Tipo de Usuario:</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="cliente">Cliente</option>
            <option value="profesional">Profesional</option>
          </select>
        </div>
        <button type="submit">Iniciar Sesión</button>
        <Link to="/signup"><button type="submit">Registrarse</button></Link>
        <Link to="/"><button type="submit">Volver</button></Link>
      </form>
    </div>
  );
}
