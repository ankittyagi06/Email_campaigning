import React, { useState,useEffect } from 'react';

import './CampaignList.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setid } from './features/counter/roomslice';
const CampaignList = () => {
  const campaignId = useSelector((state)=>state.campaign.campaignId);
  const email = useSelector((state)=>state.User.email);
  const dispatch=useDispatch();
  const navigate= useNavigate();
  const [Campaigns, setCampaigns] = useState([])
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setuserId] = useState('')

  
  useEffect(() => {
    setUserEmail(email);
    const retrievedEmail = localStorage.getItem('userEmail'); // Retrieve from local storage (optional)
    setUserEmail(retrievedEmail || window.location.state?.email); // Check passed state or local storage
  }, []);

  const getUserFromToken = async () => {
    try {
      const cookie = document.cookie.split(';').find(c => c.startsWith('jwt='));
      const token = cookie.split('=')[1]; // Extract token value
      const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET); // Replace with your secret
      setuserId(decoded.user_id); // Store user ID in state
      console.log('userId', userId)
    } catch (error) {
      console.log(error);
      // Handle error gracefully, e.g., clear cookies, redirect to login
    }
  };
  
  useEffect(() => {
    
    // const cookie = document.cookie;
    // console.log('first', cookie)
    // if (cookie.split(';').some(c => c.startsWith('jwt='))) {
    //   // Cookie exists, attempt to fetch user ID
    //   getUserFromToken();
    // }

  }, []);

  useEffect(() => {
    const updatecampaigns = async () => {
        try {
          const response = await fetch(`http://localhost:3000/campaigns/update/${email}`); 
          console.log(response.status);
        } catch (error) {
          console.error(error);
        }
    };
    updatecampaigns();
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {

        const response = await fetch('http://localhost:3000/campaigns/getallcamp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            email:userEmail,
          }), // Include JWT in authorization header
        });
        const data = await response.json();
        console.log(data.campaigns);
        setCampaigns(data.campaigns);

      } catch (error) {
        console.error(error);
        // Handle errors (e.g., display error message)
      }
    };

    fetchCampaigns();
  }, [userEmail])
  
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleFilterChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredCampaigns = Campaigns?.filter((campaign) => {
    if (selectedStatus === 'all') {
      return true;
    } else {
      return campaign.status === selectedStatus;
    }
  });

  const getCampaignDetails=async(id)=>{
    dispatch(setid({id: id}));
    console.log('id', campaignId);
    navigate('/campaign-details');
  }

  return (
    <div className="campaign-list-container">
      <h1>Your Campaigns</h1>
      get app if from database if exist otherwise create a new app automatically
      <div className="filter-container">
        <label htmlFor="filter-select">Filter by Status:</label>
        <select id="filter-select" value={selectedStatus} onChange={handleFilterChange}>
          <option value="all">All Statuses</option>
          <option value="SCHEDULED">SCHEDULED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="ongoing">ONGOING</option>
        </select>
      </div>

      <ul className="campaign-list">
        {filteredCampaigns?.map((campaign) => (
          <li key={campaign.Id} className="campaign-item">
            <div className="campaign-details">
              <span className="campaign-name">{campaign.name}</span>
              <span className="campaign-status">{campaign.status}</span>
              <button onClick={() => getCampaignDetails(campaign.Id)} disabled={campaign.status==='SCHEDULED'}>View Details</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/create-campaign">Create new Campaign</Link>
      
    </div>
  );
};

export default CampaignList;
