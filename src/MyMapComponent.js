import { React, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faInfo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
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
const pvgisApi = "https://re.jrc.ec.europa.eu/api/v5_2/seriescalc?lat=45&lon=8";

function MyMapComponent() {
  const [zoom, setZoom] = useState(8);
  const [lat, setLat] = useState(30.427755);
  const [inp, setInp] = useState("");
  const [tb, setTb] = useState(18);

  const [address, setAddress] = useState("Agadir Morocco");
  const [lng, setLng] = useState(-9.598107);
  const [center, setCenter] = useState({ lat: lat, lng: lng });
  var refe = useRef();
  geocodeString = new window.google.maps.Geocoder();

  var ref = useRef();

  const options = {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["establishment"],
  };
  var searchInput = document.getElementById("bb");
   function geo() {
    var address = refe.current.value;
    refe.current.value = null;

       geocodeString.geocode({ address: address }, function (results, status) {
      if (status == "OK") {
        setCenter(results[0].geometry.location);
        setAddress(results[0].formatted_address);
        setLat(results[0].geometry.location.lat());
        setLng(results[0].geometry.location.lng());
        let c 

        const res=async ()=>{
          
       const ress  = await axios.get(
          `/.netlify/functions/serverApi?lat=${lat}&lon=${lng}`
        );
       console.log(ress)
       if(ress){

        console.log(ress.data)

        const tab = ress.data.outputs.tmy_hourly;
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

          s += ress.data.outputs.tmy_hourly[i].T2m;
          counter++;
        }

        let j,
          k = 0;
        let f = new Array(),
          count = 0;
        for (j = 0; j < b.length; j++) {
          if (count == 31) {
            f.push(k / 31);
            count = 0;
            k = 0;
          }
          k += b[j];
          count++;
        }

       
         let o = 0
         var cnt = 0
        for (b = 0; b < f.length; b++) {
          o += f[b];
        }
        cnt = o / f.length;
        console.log(cnt)
        setTb(cnt);


       }

      }
      res() 
    
           
          

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
        codeLatLng(geocoder, lat, lng);
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
                Temperature moyenne en
              </div>

              <div className="col-sm">
                <h6>{tb.toPrecision(3)} </h6>
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
      </div>
    </div>
  );
}
export default MyMapComponent;
