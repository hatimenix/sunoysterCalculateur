import "./App.css";
import Title from "./components/Title";
import Footer from "./components/Footer";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { LngLat } from "mapbox-gl";
import MyMapComponent from "./MyMapComponent.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faInfo } from "@fortawesome/free-solid-svg-icons";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import log from "./download.jpg";
import axios from "axios";
import { Wrapper, Status,Spinner,ErrorComponent } from "@googlemaps/react-wrapper";

let isSelect = false;

 
const apiKey = "AIzaSyCzVs5-pCwCsoacR3YIPTMBCCF7gH183P4";

let puMazout = 13;
let puFioul = 4;
let puPropane = 12;
let ceFioul = 10;
let cePropane = 13;
let ceMazout = 10;
let map;

function App() {
   
  const searchInput = useRef(null);
  const mapContainer = useRef(null);

  const [inputFac, setInputFac] = useState("");

  const [addrtype, setAddrtype] = useState(["Mazout", "Fioul", "Propane"]);
  const [consType, setConstType] = useState("");
  const [factTherm, setfactTherm] = useState("");
  const [consTherm, setConsTherm] = useState("");
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();
  const render =(Status)=>{
    return <h1>{Status }</h1>
 }

React.useEffect(() => {
   if (ref.current && !map) {
     setMap(new window.google.maps.Map(ref.current,{}));
    }
 }, [ref, map]);

  const Add = addrtype.map((Add) => Add);
  const handleAddrTypeChange = (e) => {
    setConstType(e.target.value);

    if (!isSelect) {
      isSelect = true;
    } else if (isSelect) {
      isSelect = false;
      setfactTherm(0);
      setConsTherm(0);
      return;
    }

    if (e.target.value === "Mazout") {
      if (consTherm !== 0) {
        setfactTherm((puMazout * consTherm) / ceMazout);
      }
      if (factTherm !== 0) {
        setConsTherm((factTherm * ceMazout) / puMazout);
      }
    }
    if (e.target.value === "Fioul") {
      if (consTherm !== 0) {
        setfactTherm((consTherm * puFioul) / ceFioul);
      }
      if (factTherm !== 0) {
        setConsTherm((factTherm * ceFioul) / puFioul);
      }
    }
    if (e.target.value === "Propane") {
      if (consTherm !== 0) {
        setfactTherm((consTherm * puPropane) / cePropane);
        alert("sfdsf");
      }
      if (factTherm !== 0) {
        setConsTherm((factTherm * cePropane) / puPropane);
      }
    }
  };
   

  const maybeConsTherm = (e) => {
    setConsTherm(e);
    if (consType === "Propane") {
      setfactTherm((e * puPropane) / cePropane);
    }
    if (consType === "Mazout") {
      setfactTherm((e * puMazout) / ceMazout);
    }
    if (consType === "Fioul") {
      setfactTherm((e * puFioul) / ceFioul);
    }
  };
  const maybeFacTherm = (e) => {
    setfactTherm(e);

    if (consType === "Propane") {
      setConsTherm((e * cePropane) / puPropane);
      console.log(e);
    }
    if (consType === "Mazout") {
      setConsTherm((e * ceMazout) / puMazout);
    }
    if (consType === "Fioul") {
      setConsTherm((e * ceFioul) / puFioul);
    }
  };

  var Map = function () {
   return <div ref={ref} />;
  };
  const maybeInputFac = (e) => {
    setInputFac(e * 0.89);
  };

  return (
    <div className="App">
      <div className="head">
        <Title />
      </div>

      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
              id="tx"
            >
              Localisation Geographique
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
             <Wrapper apiKey={apiKey} render={render}>
               <MyMapComponent/>
             </Wrapper>

              <div className="containe">
                <div className="row">
                  <div className="col-sm" id="txt">
                    Recherche de l'emplacement
                  </div>

                  <div className="col-sm">
                    <div className="search">
                      <span></span>
                      <input
                        ref={searchInput}
                        type="text"
                        placeholder="Search location ..... "
                      />
                      <button></button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <div>
                      <FontAwesomeIcon icon={faCircleInfo} id="icon" />
                    </div>
                    <div>Info</div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm" id="tx">
                        Ville
                      </div>

                      <div className="col-sm">
                        <h6></h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm" id="tx">
                        State
                      </div>

                      <div className="col-sm">
                        <h6> </h6>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm" id="tx">
                        Pays
                      </div>

                      <div className="col-sm">
                        <h6></h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
              id="tx"
            >
              Facture et Consommation énergétique
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div className="accordion-body">
              <div className="conatine">
                <div className="row">
                  <div className="col-sm" id="cor">
                    Factures électriques annuelles
                  </div>
                  <div className="col-sm">
                    <input
                      type="text"
                      value={inputFac}
                      className="form-control"
                      onChange={(e) => setInputFac(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm" id="cor">
                    Consommation électrique Annuelle
                  </div>
                  <div className="col-sm">
                    <input
                      className="form-control"
                      onChange={(e) => maybeInputFac(e.target.value)}
                      value={inputFac / 0.89}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm" id="cor">
                    Type de carburant utilisé
                  </div>
                  <div className="col-sm">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => handleAddrTypeChange(e)}
                    >
                      <option selected value=""></option>
                      <option value="Mazout">Mazout</option>
                      <option value="Fioul">Fioul</option>
                      <option value="Propane">Propane</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm" id="cor">
                    Factures thérmique annuelles
                  </div>
                  <div className="col-sm">
                    <input
                      className="form-control"
                      value={factTherm}
                      onChange={(e) => maybeFacTherm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm" id="cor">
                    Consommation thermique annuelles
                  </div>
                  <div className="col-sm">
                    <input
                      className="form-control"
                      value={consTherm}
                      onChange={(e) => maybeConsTherm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
              id="tx"
            >
              Modèles SUNOYSTERS
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div className="accordion-body">
              <div className="row" id="image">
                <div className="container">
                  <img src={log} id="size" alt="Sunoyster 16" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
              id="tx"
            >
              Géneration énergetique
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div className="accordion-body"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
