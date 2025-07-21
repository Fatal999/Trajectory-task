import Home from '../../pages/home'
import { Global } from '@emotion/react'
import { globalStyles } from '../../styles/globalStyles'

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Home></Home>
    </>
  )
}

export default App
