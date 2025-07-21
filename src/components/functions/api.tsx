import { useEffect } from 'react'
import { useState } from 'react'

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

  useEffect(() => {
    async function fetchData() {
      const responce = await fetch(
        'https://ofc-test-01.tspb.su/test-task/vehicles',
      )
      const data = await responce.json()
      setGetCar(data)
    }
    fetchData()
  }, [])

  function editCar(index: number) {
    console.log(getCar[index])
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

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>
              <span>Year</span>
              <button type="button">+</button>
            </th>
            <th>
              <span>Price</span>
              <button type="button">-</button>
            </th>
            <th>Show on map</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {getCar.map((car, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  onChange={() => {
                    editCar(index)
                  }}
                  defaultValue={car.name}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={() => {
                    editCar(index)
                  }}
                  defaultValue={car.model}
                />
              </td>
              <td>{car.year}</td>
              <td>{car.price}</td>
              <td>
                <button type="button">Location</button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    deleteCar(index)
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
