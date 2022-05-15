import "./App.css";
import ChatBot from "react-simple-chatbot";
import Title from "./components/Title";
import Foter from "./components/Footer";
import Footer from "./components/Footer";
import React, {
  useRef,
  useEffect,
  useState,
  ReactDOM,
  createContext,
} from "react";
import mapboxgl, { LngLat } from "mapbox-gl";
import MyMapComponent from "./MyMapComponent.js";
import cs from "./sunoyster_8.png";
import context from "./context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faInfo } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
 
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import log from "./download.jpg";
import axios from "axios";
import {
  Wrapper,
  Status,
  Spinner,
  ErrorComponent,
} from "@googlemaps/react-wrapper";
import { checkboxClasses } from "@mui/material";

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

export const ghir = createContext();

function App(props) {
  const [state, setState] = useState({
    persons: [],
  });
  const [ghi, setGhi] = useState();
  const [nbrunite, setNbrunite] = useState(0);
  const [esp, setEsp] = useState(0);
  const [dni, setDni] = useState();
  const [tmpfluid,setTmpfluid]=useState();
  const [tghi, setTghi] = useState([
    128,
    149,
    191,
    218,
    232,
    232,
    226,
    214,
    173,
    153,
    113,
    116,
  ]);
  const [tdni, setTdni] = useState([
    222,
    212,
    229,
    246,
    225,
    226,
    192,
    202,
    170,
    183,
    155,
    197,
  ]);

  const [inputFac, setInputFac] = useState("");

  const [inputCons, setInputCons] = useState("");
  const [espace, sertEspace] = useState("");
  const [tempFluid, setTempFluid] = useState();

  const [addrtype, setAddrtype] = useState(["Mazout", "Fioul", "Propane"]);
  const [consType, setConstType] = useState("");
  const [factTherm, setfactTherm] = useState("");
  const [consTherm, setConsTherm] = useState("");
  const [slid, setSlid] = useState(122);
  var slider = useRef();
  var output = useRef();
  const [inits, setInits] = useState("");
  const [tubetype,setTubetype]=useState("");

  const ref = React.useRef(null);

  const validate=(e)=>{
    let al=document.getElementById('alrt')
    console.log(e.target.value)

    if(e.target.value>=90 && e.target.value<=175 || e.target.value==="" || e.target.value===null  ){ al.style.display="none";setTmpfluid(e.target.value); }
    if(e.target.value<90 || e.target.value>175){ al.style.display="block";  }
     
     

  }
  
   

  const render = (Status) => {
    return <h1>{Status}</h1>;
  };

  function updateTextInput(val) {
    document.getElementById("textInput").value = val;
  }

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
      if (isNaN(e)) {
        let element = document.getElementById("alert");
        ReactDOM.findDOMNode(element).style.display = "none";
      }

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
    if (isNaN(e)) {
      let element = document.getElementById("alert");
      ReactDOM.findDOMNode(element).style.display = "none";
    }

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
    if (isNaN(e)) {
      let element = document.getElementById("alert");
      ReactDOM.findDOMNode(element).style.display = "none";
    }

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
  const geocodeJson = "https://maps.googleapis.com/maps/api/js";

  const maybeInputFac = (e) => {
    if (isNaN(e)) {
      let element = document.getElementById("alert");
      ReactDOM.findDOMNode(element).style.display = "none";
    }

    setInputFac(e * 0.89);
  };

  const handleTubes=(e)=>{

    setTubetype(e.target.value)

 if(e.target.value==="2TH"){

   
 }



  }




  const sGHI = {
    ghi: ghi,
    dni: dni,
    tghi: tghi,
    tdni: tdni,
    setTdni: setTdni,
    setTghi: setTghi,
    setDni: setDni,
    setGhi: setGhi,
  };
  console.log(sGHI.ghi, sGHI.dni, sGHI.tdni);
  const handleChange = (event, newValue) => {
    setTempFluid(newValue);
  };
  let chekb = document.getElementById("sunoysterchoisis16");
  let chek = document.getElementById("sunoysterchoisis8");
  let che = document.getElementById("ck1c");
  let ch = document.getElementById("ck1d");
  const handlChan = (e) => {
    if (e.target.checked) {
      chek.style.display = "block";
    } else {
      chek.style.display = "none";
    }
  };

  const handleNbrUnite = (e) => {
    setNbrunite(e.target.value);
    if (che.checked) {
      setEsp(e.target.value * 25);
    }
    if (ch.checked) {
      setEsp(e.target.value * 56);
    }
  };
  const handleChang = (e) => {
    if (e.target.checked) {
      chekb.style.display = "block";
      console.log(chekb.style.display);
    } else {
      chekb.style.display = "none";
    }
  };

  return (
    <context.Provider value={sGHI}>
      <div className="App">
        <div className="head">
          <Title />
        </div>
        <div className="line"></div>

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
                  <MyMapComponent ghi={ghi} updateGhi={setGhi} />
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
                      Factures électriques annuelles en DH
                    </div>

                    <div className="col-sm">
                      <input
                        type="text"
                        placeholder="saisissez le montant annuelle en DH TTC"
                        value={Math.round(inputFac)}
                        className="form-control"
                        onChange={(e) => setInputFac(e.target.value)}
                      />
                      <div class="alert alert-danger" id="alert" role="alert">
                        This is a danger alert—check it out!
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm" id="cor">
                      Consommation électrique Annuelle en KW/h
                    </div>
                    <div className="col-sm">
                      <input
                        className="form-control"
                        placeholder="saisissez le montant annuelle en DH TTC"
                        value={Math.round(inputFac / 0.89)}
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
                      Factures thérmique annuelles en DH
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
                      Consommation thermique annuelles en KW/h
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
                  <div class="row">
                    <div className="col-sm" id="t">
                      <strong>Modele</strong>
                    </div>
                    <div class="col-md-3">
                      <div class="custom-control custom-checkbox image-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="ck1c"
                          unchecked
                          onChange={handlChan}
                        />
                        <label class="custom-control-label" for="ck1c">
                          <img src={cs} alt="#" class="img-fluid" />
                        </label>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="custom-control custom-checkbox image-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="ck1d"
                          unchecked
                          onChange={handleChang}
                        />
                        <label class="custom-control-label" for="ck1d">
                          <img src={log} alt="#" class="img-fluid" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row content">
                    <div className="col-sm" id="t">
                      {" "}
                      <p>
                        <strong>Type du modèle</strong>
                      </p>{" "}
                    </div>

                    <div className="col-sm">
                      {" "}
                      <div className="col-sm" id="cd">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id="bn"
                          onChange={(e) => {
                            handleTubes(e);
                          }}
                        >
                          <option selected value=""></option>
                          <option value="2TH">2 Tubes hybrides</option>
                          <option value="2TT">2 Tubes thermiques</option>
                          <option value="1T1E">1 Tube hybride et 1 Tube electrique</option>
                          <option value="PVPLUS">PV PLUS</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row content">
                    <div className="col-sm" id="ty">
                      <p>
                        <strong>Température du fluide</strong>
                      </p>
                    </div>
                    <div className="col-sm">
                      <input
                        className="form-control"
                        min={90}
                        max={175}
                        placeholder="inserer une temperature entre 90 et 175 C°"
                        onChange={validate}
                      ></input>
                      <div class="alert alert-danger" id="alrt" role="alert">
  <p className="ajuster">Inserer une valeu entre 90 et 175 C° </p>
</div>
                    </div>
                  </div>
                  <div className="row content">
                    <div className="col-sm" id="ty">
                      <p>
                        <strong>Nombre d'unités </strong>
                      </p>
                    </div>
                    <div className="col-sm">
                      <input
                        className="form-control"
                        min={1}
                        value={nbrunite}
                        onChange={handleNbrUnite}
                        max={20}
                        placeholder="inserer un nombnre entre 1 et 20 unite "
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3" id="ty">
                      <strong>Espace occupée : {esp} m² </strong>
                    </div>
                    <div className="col-sm-3" id="ty">
                      <strong>energie electrique géneré :  </strong>
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
              <div className="accordion-body">
                <div className="row" id="sunoysterchoisis16">
                  <div className="bg">
                    <img src={log} alt="sunoyster16" class="img-fluid" id="azz"></img>
                  </div>
                  <p id="sf">
                    <strong>Sunoyster 16</strong>
                  </p>
                </div>
                <div className="row" id="sunoysterchoisis8">
                  <div className="bg">
                    <img src={cs} alt="sunoyster16" class="img-fluid" id="az"></img>
                  </div>
                  <p id="sf">
                    <strong>Sunoyster 8</strong>
                  </p>
                </div>
                <div className="row">
                  <table class="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th colspan="12">GHI en kw/h/m²</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Janvier</td>
                        <td>Fevrier</td>
                        <td>Mars</td>
                        <td>Avril</td>
                        <td>Mai</td>
                        <td>Juin</td>
                        <td>Juillet</td>
                        <td>Août</td>
                        <td>Septembre</td>
                        <td>Octobre</td>
                        <td>Novembre</td>
                        <td>Decembre</td>
                      </tr>
                      <tr>
                        <td>{sGHI.tghi[0]}</td>
                        <td>{sGHI.tghi[1]}</td>
                        <td>{sGHI.tghi[2]}</td>
                        <td>{sGHI.tghi[3]}</td>
                        <td>{sGHI.tghi[4]}</td>
                        <td>{sGHI.tghi[5]}</td>
                        <td>{sGHI.tghi[6]}</td>
                        <td>{sGHI.tghi[7]}</td>
                        <td>{sGHI.tghi[8]}</td>
                        <td>{sGHI.tghi[9]}</td>
                        <td>{sGHI.tghi[10]}</td>
                        <td>{sGHI.tghi[11]}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th colspan="12">DNI en kw/h/m²</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Janvier</td>
                        <td>Fevrier</td>
                        <td>Mars</td>
                        <td>Avril</td>
                        <td>Mai</td>
                        <td>Juin</td>
                        <td>Juillet</td>
                        <td>Août</td>
                        <td>Septembre</td>
                        <td>Octobre</td>
                        <td>Novembre</td>
                        <td>Decembre</td>
                      </tr>
                      <tr>
                        <td>{sGHI.tdni[0]}</td>
                        <td>{sGHI.tdni[1]}</td>
                        <td>{sGHI.tdni[2]}</td>
                        <td>{sGHI.tdni[3]}</td>
                        <td>{sGHI.tdni[4]}</td>
                        <td>{sGHI.tdni[5]}</td>
                        <td>{sGHI.tdni[6]}</td>
                        <td>{sGHI.tdni[7]}</td>
                        <td>{sGHI.tdni[8]}</td>
                        <td>{sGHI.tdni[9]}</td>
                        <td>{sGHI.tdni[10]}</td>
                        <td>{sGHI.tdni[11]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </context.Provider>
  );
}

export default App;