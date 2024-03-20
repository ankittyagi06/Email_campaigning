import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './singlecampaign.css';
import MetricCard from './Components/MetricCard'
import {LineChart} from '@mui/x-charts/LineChart'
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
function SingleCampaign() {
  const base_url = '';
  const campaignId = useSelector((state) => state.campaign.campaignId);
  const campaignname = useSelector((state) => state.campaign.name);
  const [campdetails, setcampdetails] = useState({});

  
  useEffect(() => {
    const getcampdetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/campaigns/getcampactivities/${campaignId}`);
        if (response.status === 201) {
          const data = await response.json();
          console.log('data', data.campaigndata.Item[0]);
          setcampdetails(data.campaigndata.Item[0]);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        // Handle errors appropriately, e.g., display an error message to the user
      }
    };
    getcampdetails();
  }, []);

  return (
    <div className='singlecampaign'>

      <div className='singlecampaign-row'>
      <h4>Campaign Name: <span className="campaign-name">{campaignname}</span></h4>
      </div>
      
      <div className="singlecampaign-row">
        <p><b>Status:</b> {campdetails?.Result}</p>
        {campdetails && <p><b>Started At:</b> {campdetails.Start}</p>}
        {campdetails && <p><b>Ended At:</b> {campdetails.End}</p>}
      </div>

      <div className='singlecampaign-row'>
        <div className="kpis">
        <div class="kpi-box">
          <div class="kpi-title">SuccessfulEndpointCount</div>
          <div class="kpi-value">{campdetails?.SuccessfulEndpointCount}</div>
          <div class="kpi-description"></div>
        </div>
        <div class="kpi-box">
          <div class="kpi-title">FailedEndpointCount</div>
          <div class="kpi-value">{campdetails?.TotalEndpointCount - campdetails?.SuccessfulEndpointCount}</div>
          <div class="kpi-description"></div>
        </div>
        <div class="kpi-box">
          <div class="kpi-title">TotalEndpointsCounts</div>
          <div class="kpi-value">{campdetails?.TotalEndpointCount}</div>
          <div class="kpi-description"></div>
        </div>
        </div>

      </div>
      <LineChart title='Hello' sx={{color:'black'}}
      
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      width={600}
      height={400}
      
    />
    
    
    <div className='singlecampaign-row'>
      Campaign Views
    </div>

    </div>
  );
}

export default SingleCampaign;
