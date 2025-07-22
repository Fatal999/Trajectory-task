/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import Error from './error'

const tableStyle = css`
  margin: 25px 0 25px 50px;
`

const thStyle = css`
  font-family: 'Delius', 'Arial', 'Helvetica', sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 26px;
  text-align: left;
  margin-bottom: 40px;
  margin-right: 10px;
`

const tdStyle = css`
  font-family: 'Delius', 'Arial', 'Helvetica', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: white;
  background-color: transparent;
  border: none;
`

const tableButtonStyle = css`
  font-family: 'Delius', 'Arial', 'Helvetica', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: white;
  width: 25px;
  height: 25px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  margin-right: 25px;
`

const locationButtonStyle = css`
  font-family: 'Delius', 'Arial', 'Helvetica', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: white;
  width: 85px;
  height: 25px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
`

const mapStyle = css`
  width: 850px;
  height: 500px;
  border-radius: 25px;
  margin-left: 50px;
  margin-top: 25px;
`

type Car = {
  color: string
  id: number
  latitude: number
  longitude: number
  model: string
  name: string
  price: number
  year: number
}

export default function GetCars() {
  const [getCar, setGetCar] = useState<Car[]>([])

  const mapInstance = useRef<maplibregl.Map | null>(null)
  const markerRef = useRef<maplibregl.Marker | null>(null)

  const [Errortext, setErrorText] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://ofc-test-01.tspb.su/test-task/vehicles',
        )

        if (!response.ok) {
          setErrorText(true)
        }

        const data = await response.json()

        setGetCar(data)
      } catch (error) {
        setErrorText(true)
      }
    }

    fetchData()
  }, [])

  const [sortYear, setSortYear] = useState(false)
  const [arrowYear, setArrowYear] = useState('↓')

  function sortByYear() {
    const sortYears = [...getCar]

    sortYear
      ? sortYears.sort((a, b) => b.price - a.price)
      : sortYears.sort((a, b) => a.price - b.price)

    setGetCar(sortYears)
    setSortYear(!sortYear)

    if (arrowYear === '↓') {
      setArrowYear('↑')
    } else {
      setArrowYear('↓')
    }
  }

  const [sortPrices, setSortPrice] = useState(false)
  const [arrowPrice, setArrowPrice] = useState('↓')

  function sortByPrice() {
    const sortPrice = [...getCar]

    sortPrices
      ? sortPrice.sort((a, b) => b.price - a.price)
      : sortPrice.sort((a, b) => a.price - b.price)

    setGetCar(sortPrice)

    setSortPrice(!sortPrices)

    if (arrowPrice === '↓') {
      setArrowPrice('↑')
    } else {
      setArrowPrice('↓')
    }
  }

  function editCar(index: number, field: 'name' | 'model', value: string) {
    const updateCars = [...getCar]

    updateCars[index] = {
      ...updateCars[index],
      [field]: value,
    }

    setGetCar(updateCars)
  }

  function deleteCar(index: number) {
    const newCarArr = []

    for (let i = 0; i < getCar.length; i++) {
      if (i !== index) {
        newCarArr.push(getCar[i])
      }
    }

    setGetCar(newCarArr)
  }

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const map = new maplibregl.Map({
      container: mapRef.current,
      style:
        ' https://api.maptiler.com/maps/streets/style.json?key=sU3m2clyxD3xDOmfX2jS',
      center: [37.618423, 55.751244],
      zoom: 10,
    })

    mapInstance.current = map

    return () => map.remove()
  }, [])

  function carLocation(index: number) {
    const carLoc = getCar[index]

    markerRef.current?.remove()

    const marker = new maplibregl.Marker()
      .setLngLat([carLoc.longitude, carLoc.latitude])
      .addTo(mapInstance.current!)

    markerRef.current = marker

    mapRef.current?.scrollIntoView({
      behavior: 'smooth',
    })

    mapInstance.current!.flyTo({
      center: [carLoc.longitude, carLoc.latitude],
      zoom: 14,
      essential: true,
    })
  }

  return (
    <>
      <table css={tableStyle}>
        <thead>
          <tr>
            <th css={thStyle}>Name</th>
            <th css={thStyle}>Model</th>
            <th>
              <span css={thStyle}>Year</span>
              <button type="button" onClick={sortByYear} css={tableButtonStyle}>
                {arrowYear}
              </button>
            </th>
            <th>
              <span css={thStyle}>Price</span>
              <button
                type="button"
                onClick={sortByPrice}
                css={tableButtonStyle}
              >
                {arrowPrice}
              </button>
            </th>
            <th css={thStyle}>Show on map</th>
            <th css={thStyle}></th>
          </tr>
        </thead>
        <tbody>
          {getCar.map((car, index) => (
            <tr key={index}>
              <td>
                <input
                  css={tdStyle}
                  type="text"
                  onChange={e => editCar(index, 'name', e.target.value)}
                  value={car.name}
                />
              </td>
              <td>
                <input
                  css={tdStyle}
                  type="text"
                  onChange={e => editCar(index, 'model', e.target.value)}
                  value={car.model}
                />
              </td>
              <td css={tdStyle}>{car.year}</td>
              <td css={tdStyle}>{car.price}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    carLocation(index)
                  }}
                  css={locationButtonStyle}
                >
                  Location
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    deleteCar(index)
                  }}
                  css={tableButtonStyle}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Errortext && <Error></Error>}
      <div css={mapStyle} ref={mapRef} />
    </>
  )
}
