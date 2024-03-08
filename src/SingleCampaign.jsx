import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import {setid} from './features/counter/roomslice';
import './singlecampaign.css'
function SingleCampaign() {
    const base_url = "";
    const campaignId = useSelector((state)=>state.Room.campaignId);
    const [campdetails, setcampdetails] = useState({})
    useEffect(() => {
      const getcampdetails=async()=>{
         await fetch(`http://localhost:3000/getallsegments/${campaignId}`)
        .then(res=>res.json())
        .then(data=>setcampdetails(data.data[0]))
        .catch(err=>console.log(err))
      }
      getcampdetails();

      
    }, [])
    console.log("camp details from aws",campdetails);
  return (

    <div className='singlecampaign'>

      <h4>campaign id <b>::{campaignId}</b></h4>

      <div className="campaign-details">

      <p><b>Status:</b> {campdetails.Result}</p>

      {campdetails && <p><b>Deleted At:</b> {}</p>}
      <p><b>Description:</b> </p>
      <p><b>State:</b> {campdetails.State}</p>
      <p><b>SuccessfulEndpointCount:</b> {campdetails.SuccessfulEndpointCount}</p>
      <p><b>SuccessfulEndpointCount:</b> {campdetails.SuccessfulEndpointCount}</p>
      <p><b>TotalEndpointCount:</b>  {campdetails.TotalEndpointCount}</p>
      {/* Display other properties as needed */}
      {/* You can use conditional rendering for other boolean properties */}
      {/* You can also add styling using CSS classes */}
    </div>

    </div>

  )
}

export default SingleCampaign