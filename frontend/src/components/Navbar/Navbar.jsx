import React, { useState } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [navbarState, setNavbarState] = useState(false);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <Nav>
        <div className="brand">
          <div className="container">
            <a href="/#">
              <img src={"/img/tuoficio_logo.png"} alt="Tu Oficio" style={{ width: '200px', height: 'auto' }}/>
            </a>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavbarState(true)} />
            )}
          </div>
        </div>

        <ul>
          <li><a href="/#">Home</a></li>
          <li><a href="/#categories">Categorias</a></li>
          <li><a href="/#recommend">Explorar</a></li>
          <li><a href="/#testimonials">Reseñas</a></li>
          {user && <li><Link to="/profile-settings">Mi Perfil</Link></li>}
        </ul>

        {user ? (
          <UserMenu>
            <UserInfo>
              <UserAvatar>{user.firstName?.charAt(0).toUpperCase()}</UserAvatar>
              <UserName>{user.firstName} {user.lastName}</UserName>
              <UserRole>{user.role}</UserRole>
            </UserInfo>
            <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
          </UserMenu>
        ) : (
          <Link to="/login"><button>Iniciar Sesión</button></Link>
        )}
      </Nav>

      <ResponsiveNav state={navbarState}>
        <ul>
          <li><a href="#home" onClick={() => setNavbarState(false)}>Home</a></li>
          <li><a href="#categories" onClick={() => setNavbarState(false)}>Categorias</a></li>
          <li><a href="#recommend" onClick={() => setNavbarState(false)}>Explorar</a></li>
          <li><a href="#testimonials" onClick={() => setNavbarState(false)}>Reseñas</a></li>
          {user ? (
            <li><a href="#" onClick={handleLogout}>Cerrar sesión</a></li>
          ) : (
            <li><Link to="/login" onClick={() => setNavbarState(false)}>Iniciar Sesión</Link></li>
          )}
        </ul>
      </ResponsiveNav>
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  .brand {
    .container {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
    }
    .toggle {
      display: none;
    }
  }
  ul {
    display: flex;
    gap: 1rem;
    list-style-type: none;
    li {
      a {
        text-decoration: none;
        color: #FF6922;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover { color: #0E2E50; }
      }
      &:first-of-type a {
        color: #023e8a;
        font-weight: 900;
      }
    }
  }
  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 1rem;
    border: none;
    color: white;
    background-color: #48cae4;
    font-size: 1.1rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    &:hover { background-color: #023e8a; }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .toggle { display: block; }
    }
    ul { display: none; }
    button { display: none; }
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #FF6922;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #0E2E50;
  font-size: 0.95rem;
`;

const UserRole = styled.span`
  font-size: 0.75rem;
  color: #fff;
  background-color: #48cae4;
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
  text-transform: capitalize;
`;

const LogoutButton = styled.button`
  padding: 0.4rem 0.9rem !important;
  background-color: transparent !important;
  color: #e53935 !important;
  border: 1.5px solid #e53935 !important;
  border-radius: 1rem !important;
  font-size: 0.85rem !important;
  letter-spacing: 0 !important;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #e53935 !important;
    color: #fff !important;
  }
`;

const ResponsiveNav = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  top: ${({ state }) => (state ? "50px" : "-400px")};
  background-color: white;
  height: 30vh;
  width: 100%;
  align-items: center;
  transition: 0.3s ease-in-out;
  ul {
    list-style-type: none;
    width: 100%;
    li {
      width: 100%;
      margin: 1rem 0;
      margin-left: 2rem;
      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover { color: #023e8a; }
      }
      &:first-of-type a {
        color: #023e8a;
        font-weight: 900;
      }
    }
  }
`;
