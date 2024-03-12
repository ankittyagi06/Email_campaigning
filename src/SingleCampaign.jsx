import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import './singlecampaign.css'
function SingleCampaign() {
    const base_url = "";
    const campaignId = useSelector((state)=>state.campaign.campaignId);
    const [campdetails, setcampdetails] = useState({})
    useEffect(() => {
      const getcampdetails=async()=>{
        
    try {
      const response = await fetch(`http://localhost:3000/campaigns/getcampactivities/${campaignId}`);
      if(response.status === 201){
        const data = await response.json();
        console.log('data', data.campaigndata.Item[0]);
        setcampdetails(data.campaigndata.Item[0]);
      }
      
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
      }
      getcampdetails();

      
    }, [])

  return (

    <div className='singlecampaign'>

      <h4>campaign id <b>::{campaignId}</b></h4>

      <div className="campaign-details">

      <p><b>Status:</b> {campdetails?.Result}</p>

      {campdetails && <p><b>Deleted At:</b> {}</p>}
      <p><b>Description:</b> </p>
      <p><b>State:</b> {campdetails?.State}</p>
      <p><b>SuccessfulEndpointCount:</b> {campdetails?.SuccessfulEndpointCount}</p>
      <p><b>SuccessfulEndpointCount:</b> {campdetails?.SuccessfulEndpointCount}</p>
      <p><b>TotalEndpointCount:</b>  {campdetails?.TotalEndpointCount}</p>
      {/* Display other properties as needed */}
      {/* You can use conditional rendering for other boolean properties */}
      {/* You can also add styling using CSS classes */}
    </div>

    </div>

  )
}

export default SingleCampaign