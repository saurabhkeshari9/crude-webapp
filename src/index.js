import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navbar,Footer } from "./pages/layout";
import { Products } from "./pages/products";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App(){
  return(
  <>
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Products />} />
    </Routes>
    <Footer />
  </BrowserRouter>
    
  </>
  );
  
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


