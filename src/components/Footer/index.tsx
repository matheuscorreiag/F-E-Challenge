import React from "react";

// import { Container } from './styles';
import "./styles.scss";
import "../../common.scss";

// footer da página mapview

const Footer: React.FC = () => {
  return (
    <>
      <div className="footer">
        <span> Matheus Correia</span>
        <img
          src={require("../../assets/images/RegisteredTM.svg")}
          alt="trademark"
        />
      </div>
    </>
  );
};

export default Footer;
