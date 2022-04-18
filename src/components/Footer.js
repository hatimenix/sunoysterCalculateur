import sos from "../SOS.jpg"

import logo from "../logos.jpeg";
function Footer(){



    return(

        <div className="footer fixed-bottom">
            <div className="cont">
                <img src={sos} alt="sunoyster"></img>
                <img src={logo} alt="info"></img>
                </div>
        </div>



    )
}
export default Footer