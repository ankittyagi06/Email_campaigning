import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Compaign from './Compaign'
import EmailCSVGenerator from './EmailCSVGenerator'
function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <div className=''>
        <Compaign/>
        <EmailCSVGenerator/>
      </div>
    </>
  )
}

export default App
