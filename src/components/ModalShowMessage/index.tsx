import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { User } from "../../store/ducks/user/types";
import { useSelector, RootStateOrAny } from "react-redux";

// import { Container } from './styles';

interface Props {
  onHide(): any;
  show: boolean;
  bairro: string;
  message: string;
  zone: number;
  id: number;
  /*user: string; */
}
const ModalShowMessage: React.FC<Props> = (props) => {
  const userLog: User = useSelector((state: RootStateOrAny) => state.user.user);
  return (
    <>
      <Modal {...props}>
        <Modal.Dialog className="messageCard">
          <Modal.Header closeButton className="loginHeader">
            <Modal.Title style={{ fontWeight: "bold" }}>
              Mensagem Enviada!
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="showMessage">
            <div className="messageData">
              Usuário: {userLog.name}
              <br />
              Seu bairro: {props.bairro}
              <br />
              Id do bairro:{props.id}
              <br />
              Sua zona: {props.zone}
            </div>
            Sua mensagem:<span>{props.message}</span>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={props.onHide} variant="secondary">
              Fechar
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default ModalShowMessage;
