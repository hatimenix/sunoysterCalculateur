import React from "react";

import Tilte from "./components/Title";
import sos from "./SOS.jpg";
import ss from "./ALBARRAY_Consulting.jpg";
import bb from "./dynamic_so16.gif";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import sunoyster_18 from "./sunoyster_16.png";
import sunoyster_8 from "./sunoyster_8.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const geocodeString = (searchInput) => {};
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `expenses`;
    navigate(path);
  };
  return (
    <div className="container">
      <div>
        <div className="hau">
          <img src={ss} alt="sunoyster" id="imgsize" />
          <img src={sos} alt="sunoyster" id="er" />
        </div>

        <div className="imgHead">
          <img src={bb} alt="bazta" id="imgsize1" />
        </div>
      </div>

      <div className="content">
        <p id="text" className="text-justify">
          <strong>
            CALC <FontAwesomeIcon icon={faCopyright} />
          </strong>{" "}
          : Outil de calcul d’autonomie énergétique basé sur les générateurs
          solaires <strong>Sunoyster</strong>
        </p>{" "}
        <br />
        <p className="text-justify" id="ds">
          Les générateurs solaires Sunoyster génèrent simultanément de l’énergie
          électrique et thermique. Ils suivent la trajectoire du soleil par un
          système de tracking en horizontal et en verticale. En cas de
          non-ensoleillement ou de tempêtes, les générateurs se mettent
          automatiquement en position fermée pour éviter tout endommagement ou
          encrassement. .
        </p>
        <br />
        <p class="text-justify">
          <strong>Sunoyster </strong>est une solution hybride qui convertit
          jusqu'à 75 % du rayonnement solaire en électricité et chaleur.
          <br />
          <strong>Sunoyster </strong>sont disponibles en deux modèles :
          <strong> Sunoyster 16 </strong> et <strong>Sunoyster 8 </strong>.
        </p>
        <br />
        <div className="arrayw">
          <table className="t1">
            <tr>
              <th>Paramètres</th>
              <th>Sunoyster 16</th>
              <th>Sunoyster 8</th>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src={sunoyster_18} alt="Sunoyster_16"></img>
              </td>
              <td>
                <img src={sunoyster_8} alt="Sunoyster_16"></img>
              </td>
            </tr>
            <tr>
              <td>Puissance totale (hybride)</td>
              <td>12.2 KW</td>
              <td>5.5 KW</td>
            </tr>
            <tr>
              <td>Panneaux supplémentaires </td>
              <td>3.6 KW</td>
              <td>1.25 KW</td>
            </tr>
            <tr>
              <td>Diamètre de base </td>
              <td>5.24 m </td>
              <td>2.50 m </td>
            </tr>
            <tr>
              <td>Surface occupée</td>
              <td>57 m²</td>
              <td>21 m²</td>
            </tr>
            <tr>
              <td>Montage</td>
              <td>Horizontale</td>
              <td>Flexible/incliné</td>
            </tr>
            <tr>
              <td>Poids total</td>
              <td>1.100 kg</td>
              <td> &lt; 400 kg </td>
            </tr>
            <tr>
              <td>Durée d'installation</td>
              <td>4 jours - 1 homme</td>
              <td>1 jour - 1 homme</td>
            </tr>
          </table>
        </div>
        <p class="text-justify" id="pad">
          <strong>CALC utilise :</strong> Une base de données météorologique en
          temps réel pour simuler le taux d’autosuffisance et d’autoconsommation
          énergétique, avec les générateurs <strong>Sunoyster</strong> en mode
          d’injection et de stockage d'énergie.
          <br />
          <br />
          <strong>CALC calul :</strong> <br />
          <br />
          <ul>
            <li>
              La génération des puissances électrique et thermique, selon la
              localisation géographique du site d’emplacement du générateur.
            </li>
            <br />
            <li>
              L’autonomie énergétique basée sur les puissances habituellement
              consommées ou sur le bilan de puissance prévu.
            </li>
          </ul>
          <strong>CALC affiche : </strong> Après saisie des données, CALC est
          prêt à afficher les graphiques et les valeurs de simulation pour les
          degrés d'autosuffisance et d’autoconsommation du système.
        </p>
      </div>
      <div className="butt">
        <button type="button" class="btn btn-primary" onClick={routeChange}>
          SAISIE DES DONNEES
        </button>
      </div>
    </div>
  );
}
export default Home;
