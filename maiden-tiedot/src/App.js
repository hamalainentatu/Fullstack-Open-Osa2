import { useEffect, useState } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Filter = (props) => {
  return (
    <div>
        find countries<input 
        value = {props.space} 
        onChange = {props.handleChange}
        />
    </div>
  )
}

const CountryName = (props) => {
  return (
    <div>
      <p>
        {props.country.name.common}
        <button onClick={() => props.handleClick(props.country.name.common)}>show</button>
      </p>
      
    </div>
  )
}

const CountryStats = (props) => {
  const languages = Object.values(props.country.languages)
  return (
    <div>
      <h2>{props.country.name.common}</h2>
      <p>
        capital {props.country.capital[0]}
      </p>
      <p>
        area {props.country.area}
      </p>
      <p><strong>
        languages:</strong>
      </p>
      <ul>
        {languages.map(language => 
        <li key={language}>{language}</li>  
        )}
      </ul>
      <img key={props.country.flags.png} src={props.country.flags.png}></img>

      

    </div>
  )
}

const Weather = (props) => {
  const temperature = props.main.temp
  return (
    <div>
      <h2>{temperature}</h2>

    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(()=> {
    //const lat = countries[0].capitalInfo.latlng[0]
    //const lng = countries[0].capitalInfo.latlng[1]
    axios
      //.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=d2cdb6916ab1acfaba2cc0dc221e658f`)
      //.get(`https://api.openweathermap.org/data/2.5/weather?lat=42.43&lon=19.27&appid=${api_key}`)
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=42.43&lon=19.27&appid=d2cdb6916ab1acfaba2cc0dc221e658f`)
      .then(response => 
        setWeatherData(response.data))
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  const handleClick = (country) => {
    setNewFilter(country.toLowerCase())
  }

  

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newFilter))

  if (filteredCountries.length > 10) {
    return (
      <div>
        <Filter space={newFilter} handleChange={handleFilterChange}/>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <div>
        <Filter space={newFilter} handleChange={handleFilterChange}/>
        
        {filteredCountries.map(country => 
          <CountryName key = {country.name.common} handleClick={handleClick} country={country}/>
        
        )}
      </div>
    )
  } else if (filteredCountries.length === 1) {
    /*const lat = filteredCountries[0].capitalInfo.latlng[0]
    const lng = filteredCountries[0].capitalInfo.latlng[1]
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=d2cdb6916ab1acfaba2cc0dc221e658f`)
      //.get(`https://api.openweathermap.org/data/2.5/weather?lat=42.43&lon=19.27&appid=${api_key}`)
      //.get(`https://api.openweathermap.org/data/2.5/weather?lat=42.43&lon=19.27&appid=d2cdb6916ab1acfaba2cc0dc221e658f`)
      .then(response => {
        setWeatherData(response.data) //response.main.temp
        //)
      })*/
        

    return (
      <div>
        <Filter space={newFilter} handleChange={handleFilterChange}/>

        <CountryStats key = {filteredCountries[0].name.common} country={filteredCountries[0]}/>
        <h2>Wheather in </h2>
        
      </div>
    )
  } else {
    return (
      <div>
      </div>
    )
  
  }

}

export default App
