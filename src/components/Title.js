import react,{useState} from "react";
import logo from "../ll.jpeg";
import img from "../img.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo,faInfo} from '@fortawesome/free-solid-svg-icons';
  


//header de l'application 
function Title(){
   const [readMore,setReadMore]=useState(false);
   const extraContent=<div>

      <p className="extra-content">Conçu par les développeurs du logiciel de simulation PV leader sur le marché, SunoysterCalc, cet outil en ligne vous permet de saisir des données de base telles que
      </p>
   </div>
   const linkName=readMore?'reduire <<':'Cliquer ici >>'


   return( 
   
        <div className="header">

                    <img src={logo} id="color" alt="info"></img>
                 <div className="info">
                    <div>
                    <FontAwesomeIcon icon={faCircleInfo} id="inf1" /></div>   
                 <div className="description">SunoysterCalc est un calculateur d'autonomie energetique des systemes photovoltaïque </div>
                 </div>
                


         </div>)
}
export default Title
