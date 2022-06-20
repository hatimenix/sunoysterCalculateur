const { default: axios } = require("axios")

exports.handler = async function(event,context){
 
    let lat = event.multiValueQueryStringParameters.lat[0]
    let lon = event.multiValueQueryStringParameters.lon[0]
 

    ress=await  axios.get(`https://re.jrc.ec.europa.eu/api/v5_2/MRcalc?lat=${lat}&lon=${lon}&horirrad=1&startyear=2020&outputformat=json&mr_dni=1`)

    
 

 
 
    return {
        statusCode : 200,
        body : JSON.stringify(ress.data)
    }



 


   


   
}