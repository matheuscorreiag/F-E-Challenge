import React, { useState } from "react";

import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import { Map, TileLayer, Marker } from "react-leaflet";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Add from "@material-ui/icons/Add";
import Send from "@material-ui/icons/Send";

import data from "../../data/neighborhoods.json";
import "./styles.scss";
import "../../common.scss";

const SearchBox: React.FC = () => {
  const initialPosition = [-7.163, -34.879];
  const [modalShow, setModalShow] = React.useState(false);
  const [inputMessage, setInputMessage] = React.useState(false);

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
          <input type="text" placeholder="  Digite aqui" />
          <button>
            <LocationSearchingIcon />
          </button>
        </div>
        <div className="map">
          <Map center={initialPosition} zoom={12}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              key="fodase"
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
