import React, { useState, useEffect } from "react";

import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import { Map, TileLayer, Marker } from "react-leaflet";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { isAuthenticated } from "../../services/auth";
import ModalLogin from "../ModalLogin";

import db from "../../data/neighborhoods.json";
import "./styles.scss";
import "../../common.scss";
import ModalMessage from "../ModalMessage";
import ModalShowMessage from "../ModalShowMessage";

const SearchBox: React.FC = () => {
  const auth = isAuthenticated();

  const initialPosition = [-7.163, -34.879];
  const data = db.neighborhoods;

  const [zone, setZone] = useState(0);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [bairro, setBairro] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showMessage, setShowMessage] = useState(false);
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = () => setShowMessage(true);

  const [openModalMessage, setOpenModalMessage] = useState(false);

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

  function authenticationFunction(e) {
    if (auth) {
      handleShowMessage();
      setBairro(e.name);
      setId(e.id);
    } else {
      handleShow();
    }
  } /* 
  function MyVerticallyCenteredModal(props) {
    
    return <></>;
  } */
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
                              authenticationFunction(neighbors);
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
            <ModalLogin onHide={() => setShow(false)} show={show} />;
            <ModalMessage
              onHide={() => setShowMessage(false)}
              show={showMessage}
              openModalShowMessage={() => setOpenModalMessage(true)}
              bairro={bairro}
              message={(e) => setMessage(e)}
            />
            <ModalShowMessage
              onHide={() => setOpenModalMessage(false)}
              show={openModalMessage}
              bairro={bairro}
              message={message}
              zone={zone}
              id={id}
            />
          </Map>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
