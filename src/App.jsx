
import './App.css'
import CampaignList from './Compaignlist'
import Compaign from './Compaign'
import LoginSignupForm from './LoginSignupForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleCampaign from './SingleCampaign'
import SingleInputComponent from './Components/SingleInputComponent'
import Newsegment from './Components/Newsegment'
import Header from './Components/Header'
function App() {
  return (
    <>
      <div className=''>
      <Header/>
      <Router>
       <Routes>

        <Route path='/' element={<LoginSignupForm/>}/>
        <Route path='/login' element={<LoginSignupForm/>} />
        <Route path="/allcampaigns" element={<CampaignList/>} />
        <Route path='/campaign' element={<Compaign/>} />
        <Route path="/create-campaign" element={<SingleInputComponent/>} />
        <Route path="/newsegment" element={<Newsegment/>} />
        <Route path="/campaign-details" element={<SingleCampaign/>} />
       </Routes>
      </Router>
      </div>
    </>
  )
}

export default App
