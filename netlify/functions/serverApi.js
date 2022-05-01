const { default: axios } = require("axios")

exports.handler = async function(event,context){
 
    let lat = event.multiValueQueryStringParameters.lat[0]
    let lon = event.multiValueQueryStringParameters.lon[0]
    console.log(lat,lon)

    ress=await  axios.get(`https://re.jrc.ec.europa.eu/api/v5_2/tmy?lat=${lat}&lon=${lon}&raddatabase=PVGIS-SARAH2&outputformat=json`)

    
 



 
    return {
        statusCode : 200,
        body : JSON.stringify(ress.data)
    }



 


   


   
}