const request = require('request');

const geocode = (address,callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)  +".json?access_token=pk.eyJ1Ijoic2t5bWh4MyIsImEiOiJja3FwNjF1MWowMmFpMnBwbjJvcTBkZHdqIn0.xTAW8asAn7bPNlg4D2VACw&limit=1";
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location services!',undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find another location',undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;