import { React, useContext, useEffect, useRef, useState ,Link} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faInfo } from "@fortawesome/free-solid-svg-icons";
import context from "./context";
import axios from "axios";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  registerables as registerablesJS,
} from "chart.js";

ChartJS.register(...registerablesJS);

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);
let ht = 0,
  fs = 0;
let myChart = null;
let ghiMonth, tempMonth;
let arrayGhi = [128, 149, 191, 218, 232, 232, 226, 214, 173, 153, 113, 116],
  arrayDni = [222, 212, 229, 246, 225, 226, 192, 202, 170, 183, 155, 197];

let map;
 
let geocoder;
let geocodeString;
let responseDiv;
let resp;
const apiKey = "AIzaSyA-0mArLoA2qAMQxfx1GldwodYmTMaKSkQ";
const gecoderApi = "https://maps.googleapis.com/maps/api/geocode/json";

function MyMapComponent() {
  const [zoom, setZoom] = useState(8);
  const [lat, setLat] = useState(30.427755);
  const [inp, setInp] = useState("");
  const [tb, setTb] = useState(2400);
  const [ghi, setghi] = useState(2127);

  const [address, setAddress] = useState("Agadir Morocco");
  const [lng, setLng] = useState(-9.598107);
  const [center, setCenter] = useState({ lat: lat, lng: lng });
  var refe = useRef();
  geocodeString = new window.google.maps.Geocoder();

  var ref = useRef();

  var searchInput = document.getElementById("bb");

  const contextValue = useContext(context);

  useEffect(() => {
    contextValue.setGhi(ghi);
    contextValue.setDni(tb);
    contextValue.setTghi(arrayGhi);
    contextValue.setTdni(arrayDni);
  }, [ghi, tb]);

  useEffect(() => {
    const labels = [
      "Janvier",
      "Fevrier",
      "Mars",
      "Avril",
      "May",
      "Juin",
      "Juillet",
      "Août",
      "septembre",
      "octobre",
      "novembre",
      "decembre",
    ];

    if (myChart != null) {
      myChart.destroy();
    }
    myChart = new ChartJS(document.getElementById("myChart"), {
      data: {
        labels: labels,

        datasets: [
          {
            type: "bar",
            label: "GHI en kw/m²",

            data: ghiMonth,

            backgroundColor: "#00BFFF",

            borderColor: "#047baa",

            borderWidth: 1,
            yAxisID: "y",
          },
          {
            type: "bar",
            label: "DNI en kw/m²",

            data: tempMonth,

            backgroundColor: "#00FF00",

            borderColor: "#00FF00",

            borderWidth: 1,
            yAxisID: "percentage",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            type: "linear",
            position: "left",
          },
          percentage: {
            beginAtZero: true,
            type: "linear",
            position: "right",
          },
        },
      },
    });
  }, [tempMonth, ghiMonth]);

  let res = async (a, b) => {
    let ress = await axios.get(
      `/.netlify/functions/serverApi?lat=${a}&lon=${b}`
    );

    if (ress) {
      const tab = ress.data.outputs.monthly;

      arrayGhi = new Array();
      let i = 0;
      arrayDni = new Array();
      let somGhi = 0,
        somDni = 0;

      for (i = 0; i < 12; i++) {
        arrayDni.push(tab[i]["Hb(n)_m"]);
        arrayGhi.push(tab[i]["H(h)_m"]);
        somGhi += parseInt(tab[i]["H(h)_m"]);
        somDni += tab[i]["Hb(n)_m"];
      }

      setghi(somGhi);
      setTb(somDni);

      ghiMonth = arrayGhi;
      tempMonth = arrayDni;
    }
  };

  function geo() {
    var address = refe.current.value;

    refe.current.value = null;

    geocodeString.geocode({ address: address }, function(results, status) {
      if (status == "OK") {
        setCenter(results[0].geometry.location);
        setAddress(results[0].formatted_address);
        setLat(results[0].geometry.location.lat());
        setLng(results[0].geometry.location.lng());
        let c;

        res(
          results[0].geometry.location.lat().toPrecision(3),
          results[0].geometry.location.lng().toPrecision(3)
        );

        var marke = new window.google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      } else {
        alert("location introuvable : " + status);
      }
    });
  }

  useEffect(
    function() {
      map = new window.google.maps.Map(ref.current, {
        zoom: zoom,
        center: center,
        gestureHandling: 'greedy'
      });

      geocoder = new window.google.maps.Geocoder();
      
      const marker = new window.google.maps.Marker({
        position: center,
        map: map,
      });

      geocoder = new window.google.maps.Geocoder();

      function codeLatLng(geocoder, lat, lng) {
        const latlng = {
          lat: lat,
          lng: lng,
        };

        geocoder.geocode({ location: latlng }).then((response) => {
          if (response.results[0]) {
            setAddress(response.results[2].formatted_address);
          }
        });
      }
      window.google.maps.event.addListener(map, "zoom_changed", function() {
        var zoom = map.getZoom();
        setZoom(zoom);
      });

      map.addListener("click", (e) => {
        placeMarkerAndPanTo(e.latLng, map);

        setLat(e.latLng.lat());
        setLng(e.latLng.lng());

        setCenter({ lat: lat, lng: lng });
        codeLatLng(geocoder, e.latLng.lat(), e.latLng.lng());
        res(e.latLng.lat(), e.latLng.lng());
      });
      function placeMarkerAndPanTo(latLng, map) {
        new window.google.maps.Marker({
          position: latLng,
          map: map,
        });
        map.panTo(latLng);
      }
    },
    [lat]
  );

  return (
    <div>
      <div ref={ref} id="map" />
      <div className="containe">
        <div className="row">
          <div className="col-sm" id="txt">
            Recherche de l'emplacement
          </div>

          <div className="col-sm">
            <div className="search">
              <span></span>
              <input
                className="form-control"
                type="text"
                id="bb"
                ref={refe}
                placeholder="chercher l'emplacement  ..... "
              />
              <button
                className="btn btn-outline-primary"
                id="bht"
                onClick={geo}
              >
                Chercher
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="info">
            <div>
              <FontAwesomeIcon icon={faCircleInfo} id="icon" />
            </div>
            <div>Info</div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm" id="tx">
                Latitude
              </div>

              <div className="col-sm">
                <h6>{lat.toPrecision(6)}</h6>
              </div>
            </div>

            <div className="row">
              <div className="col-sm" id="tx">
                Longitude
              </div>

              <div className="col-sm">
                <h6> {lng.toPrecision(5)}</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-sm" id="tx">
                Rayonnement direct annuel normal en kw/m²
              </div>

              <div className="col-sm">
                <h6>{parseInt(tb)} </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-sm" id="tx">
                Rayonnement global annuel horizontal en kw/m²
              </div>

              <div className="col-sm">
                <h6>{ghi} </h6>
              </div>
            </div>

            <div className="row">
              <div className="col-sm" id="tx">
                Addresse
              </div>

              <div className="col-sm">
                <h6>{address}</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="row ctd">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  );
}
export default MyMapComponent;
