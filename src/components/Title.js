import sos from "../SOS.jpg";
import ss from "../ALBARRAY_Consulting.jpg";
import bb from "../dynamic_so16.gif";

//header de l'application
function Title() {
  return (
    <div>
      <div className="haut">
        <img src={ss} alt="sunoyster"  class="img-fluid" id="imgsize" />
        <img src={sos} alt="sunoyster" class="img-fluid" id="er" />
      </div>

      <div className="imgHead">
        <img src={bb} alt="bazta"  class="img-fluid" id="imgsize1" />
      </div>
    </div>
  );
}
export default Title;
