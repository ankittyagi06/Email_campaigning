import './App.css'
import CampaignList from './Compaignlist'
import Compaign from './Compaign'
import LoginSignupForm from './LoginSignupForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleCampaign from './SingleCampaign'
import SingleInputComponent from './Components/SingleInputComponent'
import Newsegment from './Components/Newsegment'
import withHeader from './WithHeader'; // Import the HOC
import ChooseTemplate from './Components/Choosetemplate'
import Template from './Template'
import CreateTemplate from './Components/CreateTemplate';
import CreateCampaign from './CreateCampaign';
import Form from './Form';
import Breadcrumbs from './Components/Breadcrumbs';
import Campaignmetric from './Components/Campaignmatrices'
import Hello from './Components/TempComponentFolder/Paging'
import AllSegments from './Components/Allsegments'
// Wrap the CampaignList component with the HOC and pass the title prop as a parameter.
// This will add a header with the provided title to the CampaignList component.
// The HOC will also add a back button to the header.
// The HOC will also add a back button to the header.
// The HOC will also add a back button to the header.
const HeaderedCampaignList = withHeader(CampaignList);
const CampaignwithHeader = withHeader(CreateCampaign);
const CampaignName = withHeader(SingleInputComponent);
function App() {
  return (
    <>
      <div className='App'>
       <Router>
       <Routes>
        <Route path='/' element={<LoginSignupForm/>}/>
        <Route path="/allcampaigns" element={<HeaderedCampaignList/>} />
        <Route path='/campaign' element={<CampaignwithHeader/>} />
        <Route path="/create-campaign" element={<CampaignName/>} />
        <Route path="/newsegment" element={<Newsegment/>} />
        <Route path="/campaign-details" element={<SingleCampaign/>} />
        <Route path='/choosetemplate' element={<ChooseTemplate/>} />
        <Route path='/templatepreview' element={<Template/>} />
        <Route path='/createtemplate' element={<CreateTemplate/>} />
        <Route path ='/allsegments' element={<AllSegments/>} />
       </Routes>
      </Router>
      </div>
    </>
  )
}

export default App
