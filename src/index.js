import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
 
import Home from './Home';
import App from "./App"
import Simulation from './Simulation'
 
import { Provider } from 'react-redux'
 
//
 

import * as serviceWorkerRegistration from './serviceWorkerRegistration';



import { render } from "react-dom"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Routes } from "react-router-dom";
 const root=ReactDOM.createRoot(document.getElementById('root'));
 root.render (


    <BrowserRouter>
   
    
    <Routes>
    
      <Route path="/" element={<Home />} />
      <Route path="expenses" element={<App />} />
    <Route path="/simulation" element={<Simulation />} />
       
  
     
    </Routes>
   
    
  </BrowserRouter>
 
 );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();