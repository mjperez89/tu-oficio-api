import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUpForm.css';

export const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dni, setDNI] = useState('');
    const [userType, setUserType] = useState('cliente');
    const [isRegistered, setIsRegistered] = useState(false);

    // Campos adicionales para profesionales
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [specialty, setSpecialty] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            password: password,
            birthDate: new Date(birthdate),
            phoneNumber: phoneNumber,
            dni: dni,
            userType: userType,
            registrationNumber: registrationNumber,
            specialty: specialty,
        };

        try {
            let response;
            if (userType === 'cliente') {
                response = await fetch('http://localhost:3000/add-client', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
            } else if (userType === 'profesional') {
                response = await fetch('http://localhost:3000/add-professional', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
            }
            const data = await response.json();
            if (response.ok) {
                setIsRegistered(true);
                window.alert(data.message);
                window.location.href = "/";

            } else {
                window.alert(data.message);
            }
        } catch (error) {
            console.error('Error al registrarse:', error);
        }
    };

    return (
        <div className='container1 box'>
            {isRegistered ? (
                <Link to="/App" />
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Registrarse</h2>
                    <div>
                        <label htmlFor="firstName">Nombre</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Apellido</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Dirección</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="birthdate">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            id="birthdate"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Número de Teléfono</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="dni">DNI</label>
                        <input
                            type="text"
                            id="dni"
                            value={dni}
                            onChange={(e) => setDNI(e.target.value)}
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
                    {/* Campos adicionales para profesionales */}
                    {userType === 'profesional' && (
                        <div>
                            <div>
                                <label htmlFor="registrationNumber">Número de Matrícula</label>
                                <input
                                    type="text"
                                    id="registrationNumber"
                                    value={registrationNumber}
                                    onChange={(e) => setRegistrationNumber(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="specialty">Especialidad</label>
                                <select
                                    id="specialty"
                                    value={specialty}
                                    onChange={(e) => setSpecialty(e.target.value)}
                                >
                                    <option value="">Seleccionar Especialidad</option>
                                    <option value="Plomero">Plomero</option>
                                    <option value="Electricista">Electricista</option>
                                    <option value="Carpintero">Carpintero</option>
                                    <option value="Albañil">Albañil</option>
                                    <option value="Jardinero">Jardinero</option>
                                </select>
                            </div>
                        </div>
                    )}
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
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Registrarse</button>
                    <Link to="/login"><button type="submit">Volver</button></Link>
                </form>
            )}
        </div>
    );
};
