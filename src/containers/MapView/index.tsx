import React from "react";
import Footer from "../../components/Footer";
import NavbarOverlay from "../../components/NavBar";

import SearchBox from "../../components/SearchBox";

const Index: React.FC = () => {
  return (
    <>
      <NavbarOverlay />
      <SearchBox />
      <Footer />
    </>
  );
};

export default Index;
