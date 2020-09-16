import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./styles.scss";
// import { Container } from './styles';

const About: React.FC = () => {
  return (
    <>
      <div className="bg-underlay">
        <Navbar bg="light" expand="lg">
          <div className="home-container">
            <img src={require("../../assets/images/logo.png")} alt="logo" />
            <Navbar.Brand href="/">JampaFinder</Navbar.Brand>
          </div>
          <Navbar.Collapse>
            <Link to="/">
              <Button variant="primary">Início</Button>
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="mid-about">
        <h1>Somos uma plataforma de comunicação da cidade de João Pessoa</h1>
        <p>
          É um facto estabelecido de que um leitor é distraído pelo conteúdo
          legível de uma página quando analisa a sua mancha gráfica. Logo, o uso
          de Lorem Ipsum leva a uma distribuição mais ou menos normal de letras,
          ao contrário do uso de "Conteúdo aqui, conteúdo aqui", tornando-o
          texto legível.
        </p>
      </div>
      <div className="bottom">
        <a href="https://github.com/matheuscorreiag">
          <img src={require("../../assets/images/github-logo.svg")} alt="git" />
        </a>
        <a href="https://instagram.com/matheuscorreiag">
          <img
            src={require("../../assets/images/instagram-seeklogo.com.svg")}
          />
        </a>
      </div>
    </>
  );
};

export default About;
