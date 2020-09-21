import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ModalLogin from "../ModalLogin";
import { User } from "../../store/ducks/user/types";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";

import "./styles.scss";
import "../../common.scss";
import { removeUser } from "../../store/ducks/user/actions";

function NavbarOverlay() {
  const [modalShow, setModalShow] = useState(false);
  const userLog: User = useSelector((state: RootStateOrAny) => state.user.user);
  const dispatch = useDispatch();
  function userLogInOut() {
    if (userLog && userLog.token !== "") {
      dispatch(removeUser());
      window.location.reload();
    } else {
      setModalShow(true);
    }
  }
  return (
    <>
      <div className="bg-underlay">
        <Navbar bg="light" expand="lg">
          <div className="home-container">
            <img src={require("../../assets/images/logo.png")} alt="logo" />
            <Navbar.Brand href="/">JampaFinder</Navbar.Brand>
          </div>
          <Navbar.Collapse>
            <Button variant="primary" onClick={userLogInOut}>
              {userLog && userLog.token !== "" ? userLog.name : "Entrar"}
            </Button>
          </Navbar.Collapse>
        </Navbar>
        <ModalLogin onHide={() => setModalShow(false)} show={modalShow} />
      </div>
    </>
  );
}

export default NavbarOverlay;
