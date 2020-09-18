import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// import { Container } from './styles';
interface Props {
  onHide(): any;
  show: boolean;
}

const ModalLogin: React.FC<Props> = (props) => {
  console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="loginHeader" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Entrar na sua conta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="login">
          <Form.Group controlId="formBasicEmail" className="login-align">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu e-mail"
              className="loginInput"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="login-align">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              className="loginInput"
            />
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
};

export default ModalLogin;
