import React from "react";

function Simulation() {
  return (
    <div className="wrapper">
      <h2 id="titre">Calcul et simulation</h2>

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
                Collapsible Group Item #1
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
        <div className="card-body" id="bodys">
          <div className="SunoysterChoisis"></div>

          <div className="contenus">
            <p>
              <u>
                <strong>autosuffisance</strong>
              </u>: 
              Le degré d’autosuffisance indique la part de la consommation
              énergétique qui est fournie par le système solaire. Elle est la
              somme de la consommation directe et la décharge du stockage
              (batteries ou citerne). Plus le degré d'autosuffisance est élevé,
              moins sont les montants des factures des autres fournisseurs
              d'énergie (ONEE, groupe électrogène, chaufferie…){" "}
            </p>
            <br/>
            <p> <u>
                <strong>autoconsommation</strong>
              </u>: 

La proportion d’autoconsommation décrit la proportion de l'énergie solaire générée qui est utilisée soit simultanément par les consommateurs d'énergie, soit pour stocker l'énergie (batteries, citerne).
 Plus la part d’autoconsommation est élevée,
  moins il y a d'énergie solaire injectée dans le réseau électrique public ou dans d’autres sources thermiques.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Simulation;
