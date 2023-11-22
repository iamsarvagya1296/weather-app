// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=d91ec7235238b9ef46627b153ee57612

import React,{ useState, useEffect } from 'react';
import Weathercard from './weathercard';
import "./style.css";
const Temp = () => {
    const [searchValue,setSearchValue] = useState("pune");
    const [tempInfo, setTempInfo] = useState({}); 

    const getWeatherInfo = async (value) => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=d91ec7235238b9ef46627b153ee57612`;
            let res = await fetch(url);
            let data = await res.json();
           const { temp, humidity,pressure } = data.main;
           //    console.log(feels_like);
           const { main: weathermood } = data.weather[0];
           const { name } = data;
           const { speed } = data.wind;
           const { country, sunset } = data.sys;

           const myNewWeatherInfo = {
            temp,
            humidity,
            pressure,
            weathermood,
            name,
            speed,
            country,
            sunset
           };

           setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error); 
        }
       
    };

    useEffect(() => { 
        getWeatherInfo("pune");
    },[]);

  return (
        <>
        <div className='wrap'>
        <div className='search'>
        <input type="search"
        placeholder='search...'
        autoFocus
        id='search'
        className='searchTerm' 
        value={searchValue }
        onChange={(e) => setSearchValue(e.target.value)}

        />

</div>
<button className='searchButton' type="button" onClick={()=>getWeatherInfo(searchValue)} >
    Search
</button>
</div>

{/* our temp card */}  

 <Weathercard tempInfo={tempInfo} />

        </>
  )
}

export default Temp;