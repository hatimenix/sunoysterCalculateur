 import './App.css';
import Title from './components/Title';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLat } from 'mapbox-gl';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo,faInfo} from '@fortawesome/free-solid-svg-icons';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import country from 'which-country/lib/which-country';
import axios from 'axios';
 
 
mapboxgl.accessToken = 'pk.eyJ1IjoiYmF6dGEiLCJhIjoiY2wxeWxtZzJjMGR0YjNtcW9hemp6cm5hNyJ9.W6ct7mRcARTDPCGx0YFcvg'

 
 


let map


 function App() {

   
   
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [inputFac,setInputFac]=useState("");
  
  const [lng, setLng] = useState(-9.598107);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [lat, setLat] = useState(30.427755);
  const [zoom, setZoom] = useState(9);
  const [country, setCountry] = useState("Agadir");
  const [addrtype, setAddrtype] = useState(["Mazout", "Fioul", "Propane"]);
  const Add = addrtype.map(Add => Add
    )
    const handleAddrTypeChange = (e) => console.log((addrtype[e.target.value]))
  
  
  

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: 8
    });

     
    
 
    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      zoom :zoom,
      
    });
    
    var bazta=document.getElementById('geocoder');
    if(bazta){
    
    bazta.appendChild(geocoder.onAdd(map.current));
     
    
    }

    var ap="https://api.mapbox.com/geocoding/v5/mapbox.places/-74.00258165196071,40.754390207222.json?types=place%2Cpostcode%2Caddress%2Ccountry&limit=1&access_token=pk.eyJ1IjoiYmF6dGEiLCJhIjoiY2wxeWxtZzJjMGR0YjNtcW9hemp6cm5hNyJ9.W6ct7mRcARTDPCGx0YFcvg"
   
     
           
       
    
 


    });

    
   
    

    useEffect(() => {
      if (!map.current) return; // wait for map to initialize
      map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    
  },);

  
  
  const fetchData = async () =>{
    setLoading(true);
    try {
      const {data: response} = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?types=country%2Cplace&limit=1&access_token=pk.eyJ1IjoiYmF6dGEiLCJhIjoiY2wxeWxtZzJjMGR0YjNtcW9hemp6cm5hNyJ9.W6ct7mRcARTDPCGx0YFcvg`);
       
      setData(response);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  }

   

  fetchData();
   

      },[]);


      
      return (
    <div className="App">

          <div className="head">

                   <Title/>


          </div>
          
          <div className="accordion" id="accordionPanelsStayOpenExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        Localisation Geographique
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div className="accordion-body">
       
    <div ref={mapContainer} className="map-container" />
       

    
      </div>
      
    </div>

    <div className="containe">

            <div className="row">

                  <div className="col-sm">Recherche de l'emplacement</div>

                            

                  <div className="col-sm">

      
                           <div id="geocoder" className="geocoder form"></div>
 

                  </div>
             </div>


             <div className="row">

<div className="col-sm">Country</div>

          

<div className="col-sm">


         <h6></h6>


</div>
</div>
<div className="row">

<div className="col-sm">Latitude</div>

          

<div className="col-sm">


         <h6>{lat}</h6>


</div>
</div>
<div className="row">

<div className="col-sm">Longitude</div>

          

<div className="col-sm">


         <h6> {lng}</h6>


</div>
</div>

             


    </div>
    
    
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        Facture et Consommation énergétique
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
      <div className="accordion-body">
         <div className="conatine">

            <div className="row">

            <div className="col-sm" id="cor" >
            Factures électriques annuelles </div>
        <div className="col-sm">


        <input type="text" value={inputFac} className="form-control" onChange={(e)=>setInputFac(e.target.value)} />


        </div>




            </div>
            <div className="row">

<div className="col-sm" id="cor" >Consommation électrique Annuelle
 </div>
<div className="col-sm">


  <input className="form-control" value={inputFac/0.89}/>


</div>




</div>

<div className="row">

            <div className="col-sm" id="cor" >
            Factures thérmique annuelles </div>
        <div className="col-sm">


             
              
         <div className="form-control"  /> 


        </div>




            </div>
            <div className="row">

            <div className="col-sm" id="cor" >
            Factures électriques annuelles </div>
        <div className="col-sm">


              <input className="form-control" />


        </div>




            </div>
            <div className="row">

<div className="col-sm" id="cor" >
Type de carburant utilisé </div>
<div className="col-sm">


<select className="form-select" aria-label="Default select example"  onChange={e => handleAddrTypeChange(e)}
        >
         {
        Add.map((address, key) => <option value={key}>{address}</option>)

         
      }
    
</select>


</div>




</div>
            


         </div> 
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
       Modèles SUNOYSTERS
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
      <div className="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>

<div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        Facture et Consommation énergétique
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
      <div className="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
      

      
     
       
    </div>
  );
}

 
export default App