const request = require('request');

const weather = (address,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=0c938c6541fc5a0f6e4a3c3280c8f33b&query="+address+"&units=s";
    //we can also use request({ url,json:true },(error,response), using the shorthand syntax url can be written only once too aslo
    //we can destructure response as {body} as we are using only the bosy property of response
    request({ url:url,json:true },(error,response)=>{
        if(error){
            callback('Unable to connect to internet',undefined);
        }else if(response.body.error){
            callback('Unable to find location',undefined);
        }else{
            callback(undefined,{
                result: "It is currently " + response.body.current.temperature + " Degree kelvin out there"
            })
            
        }
    });
}

module.exports = weather;