import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import { Map, TileLayer, Marker } from "react-leaflet";
import "./styles.scss";
import "../../common.scss";

const SearchBox: React.FC = () => {
  const initialPosition = [-7.163, -34.879];
  return (
    <>
      <div className="search-container">
        <div className="input-button">
          <input type="text" placeholder="  Digite aqui" />
          <button>
            <SearchIcon />
          </button>
        </div>
        <div className="map">
          <Map center={initialPosition} zoom={12}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </Map>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
