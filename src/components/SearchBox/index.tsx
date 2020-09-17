import React, { useState, useEffect } from "react";

import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import { Map, TileLayer, Marker } from "react-leaflet";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Add from "@material-ui/icons/Add";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import Send from "@material-ui/icons/Send";

import db from "../../data/neighborhoods.json";
import "./styles.scss";
import "../../common.scss";

const SearchBox: React.FC = () => {
  const initialPosition = [-7.163, -34.879];
  const data = db.neighborhoods;
  const [modalShow, setModalShow] = useState(false);
  const [inputMessage, setInputMessage] = useState(false);
  const [zone, setZone] = useState(0);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [bairro, setBairro] = useState("");
  const [message, setMessage] = useState("");
  const [test, setTest] = useState("");

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
  function messageModal() {
    return (
      <>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{message}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </>
    );
  }
  /*
  function messageUpdate(e) {
    e.preventDefault();
    setMessage(e.target.value);
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        id="modal"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="placeholder">
          {!inputMessage && (
            <div className="modal-page1">
              <h1> Mande uma mensagem para o bairro: {bairro}</h1>
            </div>
          )}
          {inputMessage && (
            <div className="modal-page2">
              <label> Quais melhorias você acha necessárias em {bairro}</label>

              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Small
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  as="textarea"
                  onChange={messageUpdate}
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>

              { <InputGroup
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite aqui sua mensagem"
              /> }

              <Button onClick={() => messageModal} variant="primary">
                Enviar
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="new-message"
            onClick={() => {
              setInputMessage(true);
            }}
          >
            Nova mensagem
            <Add />
          </Button>
          <Button
            onClick={() => {
              setInputMessage(false);
              props.onHide();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } */
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
            {message}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup
            className="mb-3"
            onChange={(e) =>
              localStorage.setItem("@matheus-app/message", e.target.value)
            }
          >
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="new-message"
            onClick={() => {
              messageUpdate();
              messageModal();
            }}
          >
            Enviar
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
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
                              setModalShow(true);
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
            {/* 
            <Marker
              key="position"
              position={[-7.163, -34.879]}
              onClick={() => setModalShow(true)}
            /> */}
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            {/* 
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            /> */}
          </Map>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
