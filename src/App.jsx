import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CampaignList from './Compaignlist'
import Compaign from './Compaign'
import Emailvalidation from './Emailvalidation'
function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <div className=''>
        
         <Compaign/>
        <CampaignList/>


      </div>
    </>
  )
}

export default App
