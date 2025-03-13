import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css';
import InputSide from './components/InputSide'
import WeatherSide from './components/WeatherSide'
import { CityProvider } from './context/cityContext'
import { LatAndLonProvider } from './context/latLonContext';
import LatAndLonDetails from "./components/LatAndLonDetails";


function App() {


  return (
    <>
      <CityProvider>
        <LatAndLonProvider>
          <div className='container'>
          <img className='logo' src="public/img/logi_fintek.png" alt="logo_fintek"/>
            <InputSide className='component component_input' />
            <WeatherSide className='component component_weather' />
            <LatAndLonDetails/>
          </div>
        </LatAndLonProvider>
      </CityProvider>
    </>
  )
}

export default App
