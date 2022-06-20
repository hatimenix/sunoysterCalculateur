import { React, useEffect, useState, useCallback, useRef } from "react";

import log from "./download.jpg";

import { ArcherContainer, ArcherElement } from "react-archer";
import { ReactToPrint, useReactToPrint } from "react-to-print";
import { useLocation } from "react-router-dom";

import "./index.css";

import cs from "./sunoyster_8.png";

import Chart from "react-apexcharts";

var modelee = "";
var type = "";

function Simulation() {
  const [modele, setModele] = useState("");
  const rootStyle = {
    display: "inline-grid",

    marginTop: "180px",
  };
  const rowStyle = {
    display: "flex",
    justifyContent: "center",
  };
  const boxStyle = {
    padding: "10px",
    border: "1px solid black",
    marginTop: "50px",
  };

  const location = useLocation();
  console.log(location);
  useEffect(() => {
    const sunoyster16 = document.getElementById("image11");
    const sunoyster8 = document.getElementById("image22");

    if (location.state.sunoyster16 === true) {
      sunoyster8.style.display = "block";
    }
    if (location.state.sunoyster_8 === true) {
      sunoyster16.style.display = "block";
    }
  }, []);

  // calcul et simulation

  //representation du PV-AutoSuffisance

  var pvDirect = location.state.generationElec * 0.7;
  var pvdecharge = location.state.stockageElectrique * 0.1;

  var pvReseau = location.state.consoElectriqu - (pvDirect + pvdecharge);
  //calcul en pourcentage
  var pr_pvd = (pvDirect * 100) / location.state.consoElectriqu;
  var pr_decharge = (pvdecharge * 100) / location.state.consoElectriqu;
  var pr_reseau = (pvReseau * 100) / location.state.consoElectriqu;

  //representation du PV-AutoConsommation

  var pvc_direct = pvDirect;
  var pvc_charge = location.state.stockageElectrique * 0.3;
  var pvc_injection = location.state.generationElec - (pvc_charge + pvc_direct);
  //calcul en pourcentage

  var pr_pvc_direct = parseFloat(
    (pvc_direct * 100) / location.state.generationElec
  );
  var pr_pvc_charge = parseFloat(
    (pvc_charge * 100) / location.state.generationElec
  );
  var pr_pvc_injected = parseFloat(
    (pvc_injection * 100) / location.state.generationElec
  );

  //calcul du PV-AutoSuffisance et autoconsommation

  var generationTh = location.state.generationTher;
  var th_direct = generationTh * 0.7;
  var th_decharge = location.state.stockagethermique * 0.05;
  var th_autre = location.state.consoThermique - (th_decharge + th_direct);

  var thc_charge = location.state.stockagethermique * 0.1;
  var thc_injection = location.state.generationTher - (thc_charge + th_direct);

  //pourcentage de l'autosuffisance d'energie thermique

  var prth_direct = Math.round(
    (th_direct * 100) / location.state.consoThermique
  );
  var prth_decharge = Math.round(
    (th_decharge * 100) / location.state.consoThermique
  );
  var prth_autre = Math.round((th_autre * 100) / location.state.consoThermique);
  //pourcentage de l'autoconsommation d'energie thermique

  var prthc_direct = Math.round(
    (th_direct * 100) / location.state.generationTher
  );
  var pr_thc_charge = Math.round(
    (thc_charge * 100) / location.state.generationTher
  );
  var pr_thc_autres = Math.round(
    (thc_injection * 100) / location.state.generationTher
  );

  //configuration de react-apexchart
  const opti = {
    series: [
      Math.round(prthc_direct),
      Math.round(pr_thc_charge),
      Math.round(pr_thc_autres),
    ],
    labels: ["PV Direct", "PV Decharge", "PV Reseau"],
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: "60px",

          labels: {
            show: true,
          },
        },
      },
    },
  };

  const ser = [
    Math.round(prthc_direct),
    Math.round(pr_thc_charge),
    Math.round(pr_thc_autres),
  ];
  const optio = {
    series: [
      Math.round(prth_autre),
      Math.round(prth_decharge),
      Math.round(prth_direct),
    ],
    labels: ["PV Direct", "PV Decharge", "PV Reseau"],
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: "60px",

          labels: {
            show: true,
            total: {
              show: true,
            },
          },
        },
      },
    },
  };

  const seri = [
    Math.round(prth_autre),
    Math.round(prth_decharge),
    Math.round(prth_direct),
  ];
  const options = {
    series: [parseInt(pr_decharge), parseInt(pr_pvd), parseInt(pr_reseau)],
    labels: ["PV Direct", "PV Decharge", "PV Reseau"],
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: "60px",

          labels: {
            show: true,
            total: {
              show: true,
            },
          },
        },
      },
    },
  };

  const series = [
    Math.round(pr_decharge),
    Math.round(pr_pvd),
    Math.round(pr_reseau),
  ];
  const option = {
    series: [pr_pvc_charge, pr_pvc_direct, pr_pvc_injected],
    labels: ["PV Direct", "PV Charge", "PV Injection"],
  };

  const serie = [pr_pvc_charge, pr_pvc_direct, pr_pvc_injected];

  if (location.state.sunoyster16 === true) {
    modelee = "Sunoyster 16";
    type = "hybrid";
  }
  if (location.state.sunoyster16 === false) {
    modelee = "Sunoyster 8";
    type = "hybrid";
  }

  const print = (e) => {
    window.print();
  };
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="wrapper">
      <h2 id="Ctitre">Calcul et simulation</h2>

      <div id="accordion" className="accordio">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Simulation d'autonomie énergetique
              </button>
            </h5>
          </div>
        </div>
      </div>

      <div
        id="collapseOne"
        className="collapse show"
        aria-labelledby="headingOne"
        data-parent="#accordion"
      >
        <div className="card-body" id="bodys" ref={componentRef}>
          <div className="SunoysterChoisis">
            <div className="row" id="image11" style={{ display: "none" }}>
              <img src={cs} alt="sunoyster"></img>
              <p id="titree">
                <strong>Sunoster 8</strong>
              </p>
            </div>

            <div
              className="row"
              id="image22"
              style={{ display: "none", marginLeft: "350px" }}
            >
              <img src={log} alt="sunoyster"></img>
              <p id="titree">
                <strong>Sunoster 16</strong>
              </p>
            </div>
          </div>

          <div className="contenus">
            <p>
              <u>
                <strong>autosuffisance</strong>
              </u>
              : Le degré d’autosuffisance indique la part de la consommation
              énergétique qui est fournie par le système solaire. Elle est la
              somme de la consommation directe et la décharge du stockage
              (batteries ou citerne). Plus le degré d'autosuffisance est élevé,
              moins sont les montants des factures des autres fournisseurs
              d'énergie (ONEE, groupe électrogène, chaufferie…){" "}
            </p>
            <br />
            <p>
              {" "}
              <u>
                <strong>autoconsommation</strong>
              </u>
              : La proportion d’autoconsommation décrit la proportion de
              l'énergie solaire générée qui est utilisée soit simultanément par
              les consommateurs d'énergie, soit pour stocker l'énergie
              (batteries, citerne). Plus la part d’autoconsommation est élevée,
              moins il y a d'énergie solaire injectée dans le réseau électrique
              public ou dans d’autres sources thermiques.
            </p>

            <div className="row">
              <div className="col">
                <h8>
                  <strong>autoconsommation et autosuffisance electrique</strong>
                </h8>
                <div className="col" id="pvgeneration">
                  <Chart
                    options={options}
                    series={series}
                    type="donut"
                    width="100%"
                    height="100%"
                  />
                </div>
                <p id="titre">
                  <strong>PV AutoSuffisance</strong>
                </p>
                <div className="col">
                  <Chart
                    options={option}
                    series={serie}
                    type="donut"
                    width="100%"
                    height="100%"
                  />
                </div>
                <p id="titre">
                  <strong>PV AutoConsommation</strong>
                </p>
              </div>
              <div className="col">
                <h8>
                  <strong>autoconsommation et autosuffisance thermique</strong>
                </h8>
                <div className="col" id="pvgeneration">
                  <Chart
                    options={optio}
                    series={seri}
                    type="donut"
                    width="100%"
                    height="100%"
                  />
                </div>
                <p id="titre">
                  <strong>TH AutoSuffisance</strong>
                </p>
                <div className="col">
                  <Chart
                    options={opti}
                    series={ser}
                    type="donut"
                    width="100%"
                    height="100%"
                  />
                </div>
                <p id="titre">
                  <strong>TH AutoConsommation</strong>
                </p>
              </div>
            </div>

            <div className="row" id="updateSize">
              <h3 id="head">Generation electrique</h3>
              <div style={{ height: "600px", margin: 0 }}>
                <ArcherContainer strokeColor="red">
                  <div id="confid">
                    <ArcherElement
                      id="root"
                      relations={[
                        {
                          targetId: "element2",
                          targetAnchor: "left",
                          sourceAnchor: "right",
                          style: { strokeColor: "blue", strokeWidth: 3 },
                          label: (
                            <div
                              style={{
                                marginTop: "-50px",
                                fontFamily: "sans-serif",
                                fontSize: "10px",
                                border: "1px solid black",
                                padding: "3px",
                              }}
                            >
                              <strong>
                                {Math.round(location.state.generationElec)} KWh
                              </strong>
                            </div>
                          ),
                        },
                      ]}
                    >
                      <div style={boxStyle}>Generation PV</div>
                    </ArcherElement>

                    <ArcherElement
                      id="element2"
                      relations={[
                        {
                          targetId: "element3",
                          targetAnchor: "left",
                          sourceAnchor: "right",
                          style: { strokeColor: "blue", strokeWidth: 3 },
                          label: (
                            <div
                              style={{
                                marginTop: "-80px",
                                fontFamily: "sans-serif",
                                fontSize: "10px",
                                border: "1px solid black",
                                padding: "3px",
                              }}
                            >
                              <strong>{parseInt(pvDirect)} KWh</strong>
                            </div>
                          ),
                        },
                        {
                          targetId: "element4",
                          targetAnchor: "left",
                          sourceAnchor: "right",
                          style: { strokeColor: "blue", strokeWidth: 3 },
                          label: (
                            <div
                              style={{
                                marginTop: "-50px",
                                marginLeft : "25px",
                                fontFamily: "sans-serif",
                                fontSize: "10px",
                                border: "1px solid black",
                                padding: "3px",
                              }}
                            >
                              <strong>{pvdecharge} KWh</strong>
                            </div>
                          ),
                        },
                        {
                          targetId: "element",
                          targetAnchor: "left",
                          sourceAnchor: "right",
                          style: { strokeColor: "blue", strokeWidth: 3 },
                          label: (
                            <div
                              style={{
                                marginTop: "120px",
                                fontFamily: "sans-serif",
                                fontSize: "10px",
                                border: "1px solid black",
                                padding: "3px",
                              }}
                            >
                              <strong>{parseInt(pvReseau)} KWh</strong>
                            </div>
                          ),
                        },
                      ]}
                    >
                      <div style={boxStyle}>ONDULATEUR</div>
                    </ArcherElement>
                    <div>
                      <ArcherElement
                        id="element3"
                        relations={[
                          {
                            targetId: "element6",
                            targetAnchor: "top",
                            sourceAnchor: "right",
                            style: { strokeColor: "red", strokeWidth: 3 },
                            label: (
                              <div
                                style={{
                                  marginTop: "-50px",
                                  fontFamily: "sans-serif",
                                  fontSize: "10px",
                                  border: "1px solid black",
                                  padding: "3px",
                                }}
                              >
                                <strong>{parseInt(pvDirect)} KWh</strong>
                              </div>
                            ),
                          },
                        ]}
                      >
                        <div style={boxStyle}>PV Direct</div>
                      </ArcherElement>
                      <ArcherElement
                        id="element4"
                        relations={[
                          {
                            targetId: "element6",
                            targetAnchor: "left",
                            sourceAnchor: "right",
                            style: { strokeColor: "red", strokeWidth: 3 },
                            label: (
                              <div
                                style={{
                                  marginTop: "-50px",
                                  fontFamily: "sans-serif",
                                  fontSize: "10px",
                                  border: "1px solid black",
                                  padding: "3px",
                                }}
                              >
                                <strong>{parseInt(pvc_charge)} KWh</strong>
                              </div>
                            ),
                          },
                        ]}
                      >
                        <div style={boxStyle}>PV Stockage</div>
                      </ArcherElement>
                      <ArcherElement
                        id="element"
                        relations={[
                          {
                            targetId: "element6",
                            targetAnchor: "bottom",
                            sourceAnchor: "right",
                            style: { strokeColor: "red", strokeWidth: 3 },
                            label: (
                              <div style={{ marginTop: "-20px",
                              fontFamily: "sans-serif",
                              fontSize: "10px",
                              border: "1px solid black",
                              padding: "3px", }}>
                                <strong>{parseInt(pvc_injection)} KWh</strong>
                              </div>
                            ),
                          },
                        ]}
                      >
                        <div style={boxStyle}>PV réseau</div>
                      </ArcherElement>
                    </div>

                    <div>
                      {" "}
                      <ArcherElement id="element6">
                        <div id="resize">
                          {" "}
                          <div style={boxStyle}>Consommation electrique</div>
                        </div>
                      </ArcherElement>
                    </div>
                  </div>
                  <h3 id="head">Generation thermique</h3>
                  <div style={{ height: "600px", margin: 0 }}>
                    <ArcherContainer strokeColor="red">
                      <div id="confid">
                        <ArcherElement
                          id="root"
                          relations={[
                            {
                              targetId: "element2",
                              targetAnchor: "left",
                              sourceAnchor: "right",
                              style: { strokeColor: "blue", strokeWidth: 3 },
                              label: (
                                <div
                                  style={{
                                    marginTop: "-50px",
                                    fontFamily: "sans-serif",
                                    fontSize: "10px",
                                    border: "1px solid black",
                                    padding: "3px",
                                  }}
                                >
                                  <strong>
                                    {parseInt(location.state.generationTher)}{" "}
                                    KWh
                                  </strong>
                                </div>
                              ),
                            },
                          ]}
                        >
                          <div style={boxStyle}>Generation TH</div>
                        </ArcherElement>

                        <ArcherElement
                          id="element2"
                          relations={[
                            {
                              targetId: "element3",
                              targetAnchor: "left",
                              sourceAnchor: "right",
                              style: { strokeColor: "blue", strokeWidth: 3 },
                              label: (
                                <div
                                  style={{
                                    marginTop: "-80px",
                                    fontFamily: "sans-serif",
                                    fontSize: "10px",
                                    border: "1px solid black",
                                    padding: "3px",
                                  }}
                                >
                                  <strong>{parseInt(th_direct)} KWh</strong>
                                </div>
                              ),
                            },
                            {
                              targetId: "element4",
                              targetAnchor: "left",
                              sourceAnchor: "right",
                              style: { strokeColor: "blue", strokeWidth: 3 },
                              label: (
                                <div
                                  style={{
                                    marginTop: "-50px",
                                    marginLeft : "25px",
                                    fontFamily: "sans-serif",
                                    fontSize: "10px",
                                    border: "1px solid black",
                                    padding: "3px",
                                  }}
                                >
                                  <strong>{parseInt(th_decharge)} KWh</strong>
                                </div>
                              ),
                            },
                            {
                              targetId: "element",
                              targetAnchor: "left",
                              sourceAnchor: "right",
                              style: { strokeColor: "blue", strokeWidth: 3 },
                              label: (
                                <div
                                  style={{
                                    marginTop: "120px",
                                    fontFamily: "sans-serif",
                                    fontSize: "10px",
                                    border: "1px solid black",
                                    padding: "3px",
                                  }}
                                >
                                  <strong>{parseInt(th_autre)} KWh</strong>
                                </div>
                              ),
                            },
                          ]}
                        >
                          <div style={boxStyle}>Echangeur</div>
                        </ArcherElement>
                        <div>
                          <ArcherElement
                            id="element3"
                            relations={[
                              {
                                targetId: "element6",
                                targetAnchor: "top",
                                sourceAnchor: "right",
                                style: { strokeColor: "red", strokeWidth: 3 },
                                label: (
                                  <div
                                    style={{
                                      marginTop: "-50px",
                                      fontFamily: "sans-serif",
                                      fontSize: "10px",
                                      border: "1px solid black",
                                      padding: "3px",
                                    }}
                                  >
                                    <strong>{parseInt(th_direct)} KWh</strong>
                                  </div>
                                ),
                              },
                            ]}
                          >
                            <div style={boxStyle}>TH Direct</div>
                          </ArcherElement>
                          <ArcherElement
                            id="element4"
                            relations={[
                              {
                                targetId: "element6",
                                targetAnchor: "left",
                                sourceAnchor: "right",
                                style: { strokeColor: "red", strokeWidth: 3 },
                                label: (
                                  <div
                                    style={{
                                      marginTop: "-50px",
                                      fontFamily: "sans-serif",
                                      fontSize: "10px",
                                      border: "1px solid black",
                                      padding: "3px",
                                    }}
                                  >
                                    <strong>{parseInt(thc_charge)} KWh</strong>
                                  </div>
                                ),
                              },
                            ]}
                          >
                            <div style={boxStyle}>TH Stockage</div>
                          </ArcherElement>
                          <ArcherElement
                            id="element"
                            relations={[
                              {
                                targetId: "element6",
                                targetAnchor: "bottom",
                                sourceAnchor: "right",
                                style: { strokeColor: "red", strokeWidth: 3 },
                                label: (
                                  <div
                                    style={{
                                      marginTop: "-20px",
                                      fontFamily: "sans-serif",
                                      fontSize: "10px",
                                      border: "1px solid black",
                                      padding: "3px",
                                    }}
                                  >
                                    <strong>
                                      {parseInt(thc_injection)} KWh
                                    </strong>
                                  </div>
                                ),
                              },
                            ]}
                          >
                            <div style={boxStyle}>Th autre source </div>
                          </ArcherElement>
                        </div>

                        <div>
                          {" "}
                          <ArcherElement id="element6">
                            <div id="resize">
                              {" "}
                              <div style={boxStyle}>Consommation thermique</div>
                            </div>
                          </ArcherElement>
                        </div>
                      </div>
                    </ArcherContainer>
                  </div>
                </ArcherContainer>
              </div>
            </div>
            <div className="ba">
              <div className="row b" id="resultat">
                <div className="col-sm-2">
                  <div>
                    {" "}
                    <p>
                      <strong> Modèle : </strong>{" "}
                    </p>
                  </div>
                </div>

                <div className="col-sm-2">{modelee}</div>
                <div className="col-sm-2">
                  <div>
                    {" "}
                    <p>
                      <strong> Type : </strong>{" "}
                    </p>
                  </div>
                </div>

                <div className="col-sm-2">{type}</div>
                <div className="col-sm-2">
                  <div>
                    {" "}
                    <p>
                      <strong> Température du fluide :</strong>{" "}
                    </p>
                  </div>
                </div>

                <div className="col-sm-2">{location.state.tempFluid} C°</div>

                <div className="col-sm-2">
                  <div>
                    {" "}
                    <p>
                      <strong>Nombre d'unités: </strong>{" "}
                    </p>
                  </div>
                </div>

                <div className="col-sm-2">
                  {" "}
                  {location.state.nbrunite} kit (s)
                </div>
                <div className="col-sm-2">
                  <div>
                    {" "}
                    <p>
                      <strong> Espace occupé : </strong>{" "}
                    </p>
                  </div>
                </div>

                <div className="col-sm-2"> {location.state.espace} m²</div>

                <div>
                  {" "}
                  <p>
                    <strong> </strong>{" "}
                  </p>
                </div>
                <div className="row" id="imp">
          <button className="btn btn-primary" onClick={handlePrint}>
            Imprimer En Format PDF
          </button>
        </div>
              </div>
            </div>
          </div>
        </div>
     
      </div>
    </div>
  );
}
export default Simulation;
