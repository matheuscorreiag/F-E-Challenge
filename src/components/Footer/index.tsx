import React from "react";

// import { Container } from './styles';
import "./styles.scss";
import "../../common.scss";

const Footer: React.FC = () => {
  return (
    <>
      <div className="footer">
        <span> Matheus Correia</span>
        <img src={require("../../assets/images/RegisteredTM.svg")} />
      </div>
    </>
  );
};

export default Footer;
