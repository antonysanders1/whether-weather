import React, {useState} from 'react';
import {api} from './apikey';

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
            .then(res => res.json())
            .then(data => {
                setWeather(data);
                setQuery('');
                console.log(data)
            })
        }
    }

    const dateBuiler = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let day = days[d.getDay()]
        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()

        return `${day} ${date}, ${month} ${year}`
    }
    return (
        <div className={
            (typeof weather.main != "undefined") ?
            (weather.main.temp > 69) ? 'app warm' : 'app'
            : 'app'
        }>
            <main>
                <h1 className="site-title">WhetherWeather</h1>
                <div className="search-box">
                    <input type="text" className="search-bar" placeholder="Search a city..."
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={search}/>
                </div>

                {(typeof weather.name != "undefined") ?
                <div className='info-box'>
                    <div className="location-box">
                        <div className="location">{weather.name}, {weather.sys.country}</div>
                        <div className="date">{dateBuiler(new Date())}</div>
                    </div>

                    <div className="weather-box">
                        <div></div>
                        <div className="temp">{Math.round(weather.main.temp)}˚F</div>
                        <div className="weather">{weather.weather[0].main}</div>
                        <div className="feels">Feels like: {Math.round(weather.main.feels_like)}˚F 
                        | Wind: {Math.round(weather.wind.speed)} mph</div>
                    </div>

                </div> : ('')}
            </main>
        </div>
    );
}

export default App;