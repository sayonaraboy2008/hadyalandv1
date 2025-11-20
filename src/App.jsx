import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Prizes from "./components/Prizes";
import Error from "./components/Error";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Prizes />} path={"/"} />
          <Route element={<Contact />} path={"/contactdemo"} />
          <Route element={<Error />} path={"*"} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
