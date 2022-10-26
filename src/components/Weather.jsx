import React from "react"

export default function Weather(){
    
    let dataFetched = false 
    let weatherHtml = null
    const [weatherData, setWeatherData] = React.useState({})
    const [location, setLocation] = React.useState({
            city: "",
            state: ""
    })
     
    function handleTextChange(event){
        const {name, value} = event.target
        setLocation(prevLocation => (
            {
                ...prevLocation,
                [name]: value
            }
        ))
    }
    
    function getWeather(){
        const fetchUrl = `https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${location.city},${location.state}&units=imperial`
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data)
                setLocation({
                    city: "",
                    state: ""
            })         
        })
    }
    
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    
    if(!isEmpty(weatherData)){
        dataFetched = true
    }    
    
    if (dataFetched){
       const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
      
        weatherHtml = (
                <div className="weather--container">
                    <h3 className="weather--city">{weatherData.name}</h3>
                    <h3 className="weather--temp">Current temperature: {Math.round(weatherData.main.temp)}º</h3>
                    <h3 className="weather--description">{weatherData.weather[0].main}</h3>
                    <img className="weather--image" src={iconUrl} />
                    <h3 className="weather--humidity" >Humidity: {weatherData.main.humidity}%</h3>
                </div>
        )
    }
    
   
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Enter city"
                    className="form--input"
                    name="city"
                    value={location.city}
                    onChange={handleTextChange}
                />
                <input 
                    type="text"
                    placeholder="Enter state"
                    className="form--input"
                    name="state"
                    value={location.state}
                    onChange={handleTextChange}
                />
                <button 
                    className="form--button"
                    onClick={getWeather}
                >
                    Get current weather
                </button>
            </div>
            {dataFetched && weatherHtml} 
        </main>
    )
}

