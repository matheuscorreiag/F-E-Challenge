import React, { useState } from "react";

import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import { Map, TileLayer, Marker } from "react-leaflet";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Add from "@material-ui/icons/Add";
import Form from "react-bootstrap/Form";
import Send from "@material-ui/icons/Send";

import db from "../../data/neighborhoods.json";
import "./styles.scss";
import "../../common.scss";

const SearchBox: React.FC = () => {
  const initialPosition = [-7.163, -34.879];
  const data = db.neighborhoods;
  const [modalShow, setModalShow] = React.useState(false);
  const [inputMessage, setInputMessage] = React.useState(false);
  const [zone, setZone] = useState(0);

  interface Neighborhoods {
    zone: number;
    neighborhood: any;
  }
  interface Neighborhood {
    id: number;
    name: string;
    location: [number, number];
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
            <>
              <h1> Mande uma mensagem para o seu bairro</h1>
            </>
          )}
          {inputMessage && (
            <>
              <label> Quais melhorias você acha necessárias no bairro?</label>
              <div className="textarea-container">
                <textarea placeholder="Digite aqui sua mensagem"></textarea>
              </div>
              <Button variant="primary">Enviar</Button>
            </>
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
              props.onHide();
              setInputMessage(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <>
      <div className="search-container">
        <div className="input-button">
          <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
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
                  <option key={item.zone} value={item.zone}>
                    {`Zona ${item.zone}`}
                    {/* {item.neighborhood.map((text: Neighborhood) => text.name) +
                      ","} */}
                  </option>
                ))}
                {/*   <option value="1">Zona 1</option>
                <option value="2">Zona 2</option>
                <option value="3">Zona 3</option>
                <option value="4">Zona 4</option>
                <option value="5">Zona 5</option>
                <option value="6">Zona 6</option>
                <option value="7">Zona 7</option>
                <option value="8">Zona 8</option>
                <option value="9">Zona 9</option>
                <option value="10">Zona 10</option>
                <option value="11">Zona 11</option>
                <option value="12">Zona 12</option>
                <option value="13">Zona 13</option>
                <option value="14">Zona 14</option> */}
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
        <div className="map">
          <Map center={initialPosition} zoom={12}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              key="position"
              position={[-7.163, -34.879]}
              onClick={() => setModalShow(true)}
            />
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
