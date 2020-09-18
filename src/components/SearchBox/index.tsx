import React, { useState, useEffect } from "react";

import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import { Map, TileLayer, Marker } from "react-leaflet";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import db from "../../data/neighborhoods.json";
import "./styles.scss";
import "../../common.scss";

const SearchBox: React.FC = () => {
  const initialPosition = [-7.163, -34.879];
  const data = db.neighborhoods;
  const [modalShow, setModalShow] = useState(false);

  const [zone, setZone] = useState(0);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [bairro, setBairro] = useState("");
  const [message, setMessage] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = () => setShowMessage(true);

  interface Neighborhoods {
    zone: number;
    neighborhood: any;
  }
  interface Neighborhood {
    id: number;
    name: string;
    location: [number, number];
  }

  const searchZone = () => {
    data.map((item: Neighborhoods) => {
      if (item.zone === zone) {
        setNeighborhoods(item.neighborhood);
      } else if (0 === zone) {
        setNeighborhoods([]);
      }
    });
  };
  useEffect(() => {
    searchZone();
  }, [zone]);

  function messageUpdate() {
    const messageInput = localStorage.getItem("@matheus-app/message");
    setMessage(messageInput);
  }
  function MyVerticallyCenteredModal(props) {
    const sendMessage = (e) => {
      e.preventDefault();
      handleShowMessage();
      handleClose();
      messageUpdate();
    };
    return (
      <>
        <Modal
          {...props}
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header style={{ fontWeight: "bold" }}>{bairro}</Modal.Header>
          <Modal.Body>
            <InputGroup
              className="mb-3"
              onChange={(e) =>
                localStorage.setItem("@matheus-app/message", e.target.value)
              }
            >
              <InputGroup.Prepend>
                <label>
                  Quais melhorias você acha necessárias em {bairro} ?
                </label>
              </InputGroup.Prepend>
              <FormControl
                onSubmit={sendMessage}
                as="textarea"
                placeholder="Digite aqui sua mensagem"
                aria-describedby="basic-addon1"
                className="messageInput"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button id="new-message" onClick={sendMessage}>
              Enviar
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showMessage} onHide={handleCloseMessage}>
          <Modal.Dialog className="messageCard">
            <Modal.Header closeButton className="loginHeader">
              <Modal.Title style={{ fontWeight: "bold" }}>
                Mensagem Enviada!
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="showMessage">
              <div className="messageData">
                Seu bairro: {bairro}
                <br />
                Sua zona: {zone}
              </div>
              Sua mensagem:<span>{message}</span>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={handleCloseMessage} variant="secondary">
                Fechar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </>
    );
  }
  return (
    <>
      <div className="search-title">
        <h1> Selecione uma zona e bairro para enviar uma mensagem</h1>
      </div>
      <div className="search-container">
        <div className="input-button">
          <Form>
            <Form.Group
              controlId="exampleForm.SelectCustom"
              className="search-align"
            >
              <div className="img-search">
                <LocationSearchingIcon />
              </div>
              <Form.Control
                as="select"
                onChange={(e: any) => setZone(Number(e.target.value))}
                custom
              >
                <option value={0}> Selecione uma zona</option>

                {data.map((item: Neighborhoods) => (
                  <>
                    <option key={item.zone} value={item.zone}>
                      {`Zona ${item.zone}`}
                    </option>
                  </>
                ))}
              </Form.Control>
            </Form.Group>
            {zone > 0 && (
              <div className="buttons-container">
                {data.map((item: Neighborhoods) => (
                  <>
                    {item.neighborhood.map((neighbors: Neighborhood) => (
                      <>
                        {zone === item.zone && (
                          <Button
                            className="neighbors-buttons"
                            variant="primary"
                            onClick={() => {
                              handleShow();
                              setBairro(neighbors.name);
                            }}
                          >
                            {neighbors.name}
                          </Button>
                        )}{" "}
                      </>
                    ))}
                  </>
                ))}
              </div>
            )}
          </Form>
        </div>
        <div className="map">
          <Map center={initialPosition} zoom={12}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {neighborhoods.map((markerPos: Neighborhood) => (
              <Marker
                position={markerPos.location}
                title={markerPos.name}
                key={markerPos.name}
              />
            ))}
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Map>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
