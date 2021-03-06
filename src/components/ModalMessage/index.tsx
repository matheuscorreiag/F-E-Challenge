import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
// import { Container } from './styles';

interface Props {
  onHide(): any;
  show: boolean;
  openModalShowMessage(): any;
  bairro: string;
  message: any;
}

//modal de envio de mensagem

const ModalMessage: React.FC<Props> = (props) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    props.message(message); //seta mensagem
    props.onHide(); //apaga modal de mensagem
    props.openModalShowMessage(); //mostra modal com dados e mensagem
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ fontWeight: "bold" }}></Modal.Header>
        <Modal.Body>
          <InputGroup
            className="mb-3"
            /* onChange={(e) =>
              localStorage.setItem("@matheus-app/message", e.target.value)
            } */
          >
            <InputGroup.Prepend>
              <label>
                Quais melhorias você acha necessárias em {props.bairro} ?
              </label>
            </InputGroup.Prepend>
            <FormControl
              as="textarea"
              placeholder="Digite aqui sua mensagem"
              aria-describedby="basic-addon1"
              className="messageInput"
              onChange={(e) => setMessage(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button id="new-message" onClick={sendMessage}>
            Enviar
          </Button>
          <Button onClick={props.onHide}>Fechar</Button>
        </Modal.Footer>
      </Modal>
      {/* <ModalShowMessage
        onHide={() => setShowMessage(false)}
        show={showMessage}
      /> */}
    </>
  );
};

export default ModalMessage;
