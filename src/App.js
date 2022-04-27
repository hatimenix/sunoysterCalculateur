import "./App.css";
import Title from "./components/Title";
import Footer from "./components/Footer";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { LngLat } from "mapbox-gl";
import MyMapComponent from "./MyMapComponent.js";
import cs from "./sunoyster_8.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faInfo } from "@fortawesome/free-solid-svg-icons";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import log from "./download.jpg";
import axios from "axios";
import {
  Wrapper,
  Status,
  Spinner,
  ErrorComponent,
} from "@googlemaps/react-wrapper";

let isSelect = false;
let geocoder;

const apiKey = "AIzaSyA-0mArLoA2qAMQxfx1GldwodYmTMaKSkQ";

let puMazout = 13;
let puFioul = 4;
let puPropane = 12;
let ceFioul = 10;
let cePropane = 13;
let ceMazout = 10;
let submitButton;

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

function App() {
  const [state, setState] = useState({
    persons: [],
  });
  const [inputFac, setInputFac] = useState("");

  const [inputCons,setInputCons]=useState("");
  

  const [addrtype, setAddrtype] = useState(["Mazout", "Fioul", "Propane"]);
  const [consType, setConstType] = useState("");
  const [factTherm, setfactTherm] = useState("");
  const [consTherm, setConsTherm] = useState("");
  const [slid,setSlid]=useState(122)
  var slider = useRef()
  var output = useRef()
const [inits,setInits]=useState('')


 
  useEffect(() => {
    output.innerHTML = slider.current.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
      output.innerHTML = slider.current.value;
    };
  }, []);

  const ref = React.useRef(null);

  const render = (Status) => {
    return <h1>{Status}</h1>;
  };

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
        setfactTherm(((puMazout * consTherm) / ceMazout));
      }
      if (factTherm !== 0) {
        setConsTherm(((factTherm * ceMazout) / puMazout));
      }
    }
    if (e.target.value === "Fioul") {
      if (consTherm !== 0) {
        setfactTherm(((consTherm * puFioul) / ceFioul));
      }
      if (factTherm !== 0) {
        setConsTherm(((factTherm * ceFioul) / puFioul));
      }
    }
    if (e.target.value === "Propane") {
      if (consTherm !== 0) {
        setfactTherm(((consTherm * puPropane) / cePropane));
        alert("sfdsf");
      }
      if (factTherm !== 0) {
        setConsTherm(((factTherm * cePropane) / puPropane));
      }
    }
  };

  const maybeConsTherm = (e) => {
    setConsTherm(e);
    if (consType === "Propane") {
      setfactTherm(((e * puPropane) / cePropane));
    }
    if (consType === "Mazout") {
      setfactTherm(((e * puMazout) / ceMazout));
    }
    if (consType === "Fioul") {
      setfactTherm(((e * puFioul) / ceFioul));
    }
  };
  const maybeFacTherm = (e) => {
    setfactTherm(e);

    if (consType === "Propane") {
      setConsTherm(((e * cePropane) / puPropane));
      console.log(e);
    }
    if (consType === "Mazout") {
      setConsTherm(((e * ceMazout) / puMazout));
    }
    if (consType === "Fioul") {
      setConsTherm(((e * ceFioul) / puFioul));
    }
  };
  const geocodeJson = "https://maps.googleapis.com/maps/api/js";

  const maybeInputFac = (e) => {
    setInputFac((e * 0.89));
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
              <Wrapper apiKey={apiKey} region="ma" render={render}>
                <MyMapComponent />
              </Wrapper>
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
                      value={(inputFac / 0.89)}
                      onChange={(e) => maybeInputFac(e.target.value)}
                    
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
              <div classsName="form-group form-group-image-checkbox is-invalid">
               
                <div classsName="row " id="cont" >

                  <div className="col-md-3" id="modele"><strong>Modèle</strong></div>
                <div classsName="col-md-3">
        <div classsName="custom-control custom-radio image-checkbox" >
            <input type="radio" classsName="custom-control-input" id="ck2a" name="ck2" />
            <label classsName="custom-control-label" htmlFor="ck2a" >
                <img src={cs} alt="#" class="img-fluid" id="sizeP" /> 
            </label>
        </div>
    </div>

                  <div className="col-md-3">
                    <div classsName="custom-control custom-radio image-checkbox">
                      <input
                        type="radio"
                        classsName="custom-control-input"
                        id="ck2d"
                        name="ck2"
                      />
                      <label classsName="custom-control-label" htmlFor="ck2d">
                        <img src={log} alt="#" classsName="img-fluid" id="sizeP" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row content">
                  <div className="col-sm" id="t">
                    {" "}
                    <p><strong>Type du modèle</strong></p>{" "}
                  </div>

                  <div className="col-sm">
                    {" "}
                    <div className="col-sm" id="cd">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="bn"
                      >
                        <option selected value=""></option>
                        <option value="Mazout">2 Tubes hybrides</option>
                        <option value="Fioul">2 Tubes thermiques</option>
                        <option value="Propane">1 Tube hybride</option>
                        <option value="Fioul">1 Tubes thermiques</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row content">
                  <div className="col-sm" id="ty">
                    {" "}
                    <p><strong>Température du fluide</strong></p>{" "}
                  </div>

                  <div className="col-sm slidecontainer">
                    <input
                      type="range"
                      min="90"
                      max="175"
                     
                      ref={slider}
                      class="slider"
                      id="myRange"
                      onChange={(e)=>setSlid(e.target.value)}
                    />
                    <p id="demo" ref={output}></p>
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
