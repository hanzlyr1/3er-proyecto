
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorFetch from './components/ErrorFetch'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'

function App() {

  const [location, setLocation] = useState()
  const [locationImput, setLocationImput] = useState()

  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    let URL
    if (locationImput) {
      URL = `https://rickandmortyapi.com/api/location/${locationImput}`
    } else {
      const random = Math.ceil(Math.random() * 126) + 1

      URL = `https://rickandmortyapi.com/api/location/${random}`
    }




    axios.get(URL)
      .then(res => {

        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => {
        setHasError(true)
        console.log(err)
      })


  }, [locationImput])
  const handleSubmit = e => {
    e.preventDefault()
    setLocationImput(e.target.inputSearch.value)
  }

  console.log(locationImput)
  return (
    <div className="App">
      <header >
        <div className='img'></div>
      </header>
      <div className='header'>
        <h1 className='header__title'>Rick and Morty</h1>
        <div className='div'>
          <form className='header__form' onSubmit={handleSubmit}>
            <input className='header__input' id="inputSearch" type="text" />
            <button className='header__button'>Search</button>

          </form>
        </div>
      </div>

      {
        hasError ?
          <ErrorFetch />
          :
          <>
            <LocationInfo location={location} />
            <div className='residents-container'>
              {
                location?.residents.map(url => (
                  <ResidentCard key={url} url={url} />
                ))
              }
            </div>
          </>
      }
    </div>

  )
}

export default App
