import react,{useState} from "react";
import logo from "../ALBARRAY_Consulting.jpg";
import img from "../img.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo,faInfo} from '@fortawesome/free-solid-svg-icons';
  


//header de l'application 
function Title(){
   const [readMore,setReadMore]=useState(false);
   const extraContent=<div>

      <p className="extra-content">Conçu par les développeurs du logiciel de simulation PV leader sur le marché, PV*SOL, cet outil en ligne vous permet de saisir des données de base telles que
      </p>
   </div>
   const linkName=readMore?'reduire <<':'Savoir plus >>'


   return( 
   
        <div className="header">

                    <img src={logo} alt="info"></img>
                 <div className="info">
                    <div>
                    <FontAwesomeIcon icon={faCircleInfo} id="inf1" /></div>   
                 <div className="description">SunoysterCalc est calculateur d'autonomie energetique des systemes PV, pour savoir plus <a className="read-more-link" onClick={()=>{setReadMore(!readMore)}}><h6>{linkName}</h6></a>
      {readMore && extraContent}</div>
                 </div>
                


         </div>)
}
export default Title
