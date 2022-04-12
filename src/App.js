import React from "react"
import Header from "./Components/Header"
import { Routes, Route } from "react-router-dom"
import Products from "./Components/Products"
import ProductsDetails from "./Components/ProductsDetails"
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Products />} />
        <Route exact path="/cart/:id" element={<ProductsDetails />} />
      </Routes>
    </>
  );
}

export default App;
