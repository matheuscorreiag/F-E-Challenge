import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { LockOpen, Search } from "@material-ui/icons";

import "./styles.scss";
// import { Container } from './styles';

const Landing: React.FC = () => {
  return (
    <>
      <div className="bg-underlay">
        <Navbar bg="light" expand="lg">
          <div className="home-container">
            <img src={require("../../assets/images/logo.png")} alt="logo" />
            <Navbar.Brand href="/">JampaFinder</Navbar.Brand>
          </div>
          <Navbar.Collapse>
            <Link to="/about">
              <Button variant="primary">
                Sobre
                {/* <SearchIcon /> */}
              </Button>
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="mid-app">
        <div className="wrapper-app">
          <div className="title-app">
            <h1>
              Seu site de mensagens <br />
              direto para seu bairro.
            </h1>
            <p>
              Ajudamos pessoas a mandar mensagens <br />
              para seus bairros de forma eficiente.
            </p>
          </div>
          <img
            src={require("../../assets/images/undraw_my_current_location_om7g.svg")}
            alt="undraw"
          />
        </div>

        <div className="actions-app">
          <Link to="/maps">
            <button>
              <ExitToApp style={{ color: "#FFF", marginRight: 10 }} />
              <p>Entrar</p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;
