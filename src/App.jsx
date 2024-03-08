import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CampaignList from './Compaignlist'
import Compaign from './Compaign'
import Emailvalidation from './Emailvalidation'
import LoginSignupForm from './LoginSignupForm'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SingleCampaign from './SingleCampaign'
import Campaignname from './Components/SingleInputComponent'
import Template from './Template'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className=''>
      <Router>
      <Routes>
  <Route path='/' element={<Template/>}/>
  <Route path='/login' element={<LoginSignupForm/>} />
  <Route path="/allcampaigns" element={<CampaignList userId={'aktyagi18052002@gmail.com'}/>} />
  <Route path='/campaign' element={<SingleCampaign/>} />
  <Route path="/create-campaign" element={<Compaign/>} />
      </Routes>
      </Router>
      </div>
    </>
  )
}

export default App
