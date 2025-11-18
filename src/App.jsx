import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Prizes from "./components/Prizes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Prizes />} path={"/"} />
          <Route element={<Contact />} path={"/contact"} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
