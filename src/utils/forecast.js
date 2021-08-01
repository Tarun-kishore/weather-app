const request = require('request')

const forecast = (location,callback)=>{
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        json: true,
        qs: {q: location},
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
          useQueryString: true
        }
      }
      
    request(options,(error,{body})=>{
        if(error){
            callback({error: 'Unable to connect to API'},undefined)
        }
        else if(body.error){
            callback({error : body.error.message},undefined)
        }
        else{
            callback(undefined,{
                location:body.location.name,
                condition : body.current.condition.text,
                icon : body.current.condition.icon,
                temp: body.current.temp_c,
                humidity : body.current.humidity,
                feelsLike : body.current.feelslike_c
            })
        }
    })
}


module.exports = forecast