import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./styles.scss";
import "../../common.scss";

function NavbarOverlay() {
  const [modalShow, setModalShow] = useState(false);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Entrar na sua conta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" placeholder="Digite seu e-mail" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Digite sua senha" />
            </Form.Group>
            <div className="button-login">
              <Button variant="primary" type="submit">
                Entrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
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

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default NavbarOverlay;
