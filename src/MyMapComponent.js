import { React, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faInfo } from "@fortawesome/free-solid-svg-icons";
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

let myChart=null;
let ghiMonth, tempMonth;

let map;
let raddatabase = "PVGIS-SARAH2";
let outputformat = "json";
let marker;
let geocoder;
let geocodeString;
let responseDiv;
let resp;
const apiKey = "AIzaSyA-0mArLoA2qAMQxfx1GldwodYmTMaKSkQ";
const gecoderApi = "https://maps.googleapis.com/maps/api/geocode/json";

function MyMapComponent() {

  const [ghiJan,setGhiJanv]=useState()
  const [ghiFev,setGhiFev]=useState()
  const [ghiMar,setGhiMar]=useState()
  const [ghiAvr,setGhiAvr]=useState()
  const [ghiMai,setGhiMai]=useState()
  const [ghiJuin,setGhiJuin]=useState()
  const [ghiJuil,setGhiJuil]=useState()
  const [ghiAout,setGhiAout]=useState()
  const [ghiSep,setGhiSep]=useState()
  const [ghiOct,setGhiOct]=useState()
  const [ghiNov,setGhiNov]=useState()
  const [ghiDec,setGhiDec]=useState()
  const [zoom, setZoom] = useState(8);
  const [lat, setLat] = useState(30.427755);
  const [inp, setInp] = useState("");
  const [tb, setTb] = useState(18);
  const [ghi, setghi] = useState(259);
  const [ghimonths, setGhimonths] = useState([
    411, 435, 490, 600, 556, 537, 497, 545, 491, 446, 418, 323,
  ]);
  const [tempmonths, setTempmonths] = useState([
    14, 14, 16, 17, 17, 24, 24, 23, 22, 21, 18, 15,
  ]);

  const [address, setAddress] = useState("Agadir Morocco");
  const [lng, setLng] = useState(-9.598107);
  const [center, setCenter] = useState({ lat: lat, lng: lng });
  var refe = useRef();
  geocodeString = new window.google.maps.Geocoder();

  var ref = useRef();

  var searchInput = document.getElementById("bb");

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

    if(myChart!=null){
      myChart.destroy();
    }
    myChart = new ChartJS(document.getElementById("myChart"), {
      data: {
        labels: labels,

        datasets: [
          {
            type: "bar",
            label: "GHI en w/m²",

            data:ghiMonth,

            backgroundColor: "#005555",

            borderColor: "#047baa",

            borderWidth: 1,
            yAxisID: "y",
          },
          {
            type: "line",
            label: "Tempeature en C°",

            data: tempMonth,

            backgroundColor: "#aa3e04",

            borderColor: "#aa3e04",

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
  }, [tempMonth,ghiMonth]);

  let res = async (a, b) => {
    let ress = await axios.get(
      `/.netlify/functions/serverApi?lat=${a}&lon=${b}`
    );

    if (ress) {
      const tab = ress.data.outputs.tmy_hourly;

      let sum = 0,
        set,
        p = 0,
        t = 0;
      let compteur = 0;
      let array = new Array();

      for (p = 0; p < tab.length; p++) {
        let tt = parseFloat(tab[p]["G(h)"]);

        sum += tt;
        compteur++;

        if (tt == 0) {
          t++;
        }

        if ((compteur === 24 && sum == 0) || sum === Infinity) {
          sum = 500;

          if (sum / (24 - t) === Infinity) {
            array.push(300);
            compteur = 0;
            sum = 0;
            t = 0;
          } else {
            array.push(Math.round(sum / (24 - t)));
            compteur = 0;
            sum = 0;
            t = 0;
          }
        } else if (compteur === 24 && sum != 0) {
          array.push(Math.round(sum / (24 - t)));
          compteur = 0;
          sum = 0;
          t = 0;
        }
      }
      console.log(array);

      let h = 0,re=0;
       let a = 0;
       let x = new Array();
      let  ss = 0;
      for (h = 0; h < array.length; h++) {
        if (a == 30) {
          x.push(parseInt(ss / 30));
          
           
 
          ss = 0;
          a = 0;
        }

        ss += array[h];
        a++;
     
      }
      ghiMonth = x;
      setGhiJanv(22)

 
      let z = 0,
        e = 0,
        r = new Array(),
        sss = 0;
      for (z = 0; z < x.length; z++) {
        e += x[z];
      }
      sss = e / x.length;
      setghi(sss);

      let s = 0,
        i;
      let counter = 0;
      let b = new Array();
      for (i = 0; i < tab.length; i++) {
        if (counter == 24) {
          b.push(s / 24);
          counter = 0;
          s = 0;
        }

        s += tab[i].T2m;
        counter++;
      }

      let j,
        k = 0;
      let f = new Array(),
        count = 0;
      for (j = 0; j < b.length; j++) {
        if (count == 30) {
          setTempmonths([...tempmonths, k / 30]);
          f.push(parseInt(k / 30));

          count = 0;
          k = 0;
        }
        k += b[j];
        count++;
      }
      tempMonth = f;
      console.log(tempMonth);

      let o = 0;
      var cnt = 0;
      for (b = 0; b < f.length; b++) {
        o += f[b];
      }
      cnt = o / f.length;

      setTb(cnt);
    }
  };

  function geo() {
    var address = refe.current.value;
    refe.current.value = null;

    geocodeString.geocode({ address: address }, function (results, status) {
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
        alert("sdgdsgdsgsdg : " + status);
      }
    });
  }

  useEffect(
    function () {
      map = new window.google.maps.Map(ref.current, {
        zoom: zoom,
        center: center,
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
      window.google.maps.event.addListener(map, "zoom_changed", function () {
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
                placeholder="Search location ..... "
              />
              <button className="btn btn-outline-primary" onClick={geo}>
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
                <h6>{lat.toPrecision(3)}</h6>
              </div>
            </div>

            <div className="row">
              <div className="col-sm" id="tx">
                Longitude
              </div>

              <div className="col-sm">
                <h6> {lng.toPrecision(3)}</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-sm" id="tx">
                Temperature moyenne en (C°)
              </div>

              <div className="col-sm">
                <h6>{tb.toPrecision(3)} </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-sm" id="tx">
                global horizontal irradiation en (W/m²)
              </div>

              <div className="col-sm">
                <h6>{ghi.toPrecision(3)} </h6>
              </div>
            </div>

            <div className="row">
              <div className="col-sm" id="tx">
                Address
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
