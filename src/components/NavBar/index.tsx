import React, { useState, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ModalLogin from "../ModalLogin";

import "./styles.scss";
import "../../common.scss";

function NavbarOverlay() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="bg-underlay">
        <Navbar bg="light" expand="lg">
          <div className="home-container">
            <img src={require("../../assets/images/logo.png")} alt="logo" />
            <Navbar.Brand href="/">JampaFinder</Navbar.Brand>
          </div>
          <Navbar.Collapse>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Login
              {/* <SearchIcon /> */}
            </Button>
          </Navbar.Collapse>
        </Navbar>
        <ModalLogin onHide={() => setModalShow(false)} show={modalShow} />
      </div>
    </>
  );
}

export default NavbarOverlay;
