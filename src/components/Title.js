import sos from "../SOS.jpg";
import ss from "../ALBARRAY_Consulting.jpg";
import bb from "../bazt.jpeg";

//header de l'application
function Title() {
  return (
    <div>
      <div className="haut">
        <img src={sos} alt="sunoyster" />
        <img src={ss} alt="sunoyster" id="imgsize" />
      </div>

      <div className="imgHead">
        <img src={bb} alt="bazta" id="imgsize1" />
      </div>
    </div>
  );
}
export default Title;
