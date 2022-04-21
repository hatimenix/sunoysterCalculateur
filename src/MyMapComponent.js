import { React,useEffect,useRef} from "react";



function MyMapComponent(_a) {
    var center = _a.center, zoom = _a.zoom;
    var ref = useRef();
    useEffect(function () {
        new window.google.maps.Map(ref.current, {
            center: {lat : -9 , lng : 30},
            zoom: 8,
        });
    });
    return <div ref={ref} id="map" />;
}
export default MyMapComponent