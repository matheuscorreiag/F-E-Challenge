import React, { useState, useEffect } from "react";

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
  const [zoneSelected, setZoneSelected] = useState(0);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

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
                  <>
                    <option key={item.zone} value={item.zone}>
                      {`Zona ${item.zone}`}
                    </option>
                  </>
                ))}
              </Form.Control>
            </Form.Group>
            {zone > 0 && (
              <>
                {data.map((item: Neighborhoods) => (
                  <>
                    {item.neighborhood.map((neighbors: Neighborhood) => (
                      <>
                        <Button variant="primary">{neighbors.name}</Button>
                      </>
                    ))}
                  </>
                ))}
              </>
            )}
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
