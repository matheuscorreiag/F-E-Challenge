import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { updateUser } from "../../store/ducks/user/actions";
import { User } from "../../store/ducks/user/types";

// import { Container } from './styles';
interface Props {
  onHide(): any;
  show: boolean;
}

//modal de login do usuário estático:

//email: matheuscorreiags@gmail.com
//password: 12345

const ModalLogin: React.FC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLog: User = useSelector((state: RootStateOrAny) => state.user.user);

  function authentication() {
    //seta o usuário para o usuário estático
    const user: User = {
      id: "1",
      email: "matheuscorreiags@gmail.com",
      name: "Matheus",
      password: "12345",
      token: "auth",
    };
    //compara se o usuário digitado é igual ao usuário estático
    if (email !== user.email && password !== user.password) {
      alert("Invalid email or password");
    }
    dispatch(updateUser({ user }));
  }
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="login-align">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="button-login">
            <Button onClick={authentication} variant="primary" type="submit">
              Entrar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalLogin;
