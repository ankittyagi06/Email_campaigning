import React, { useState,useEffect } from 'react';

import './CampaignList.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setid } from './features/counter/roomslice';
const CampaignList = () => {
  const dispatch=useDispatch();
  const navigate= useNavigate();
  const [Campaigns, setCampaigns] = useState([])
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setuserId] = useState('')
  
  useEffect(() => {

    const retrievedEmail = localStorage.getItem('userEmail'); // Retrieve from local storage (optional)
    setUserEmail(retrievedEmail || window.location.state?.email); // Check passed state or local storage

  }, []);
  

  // useEffect(() => {
  //   // Fetch campaign data from the server-side API endpoint
  //   const fetchCampaigns = async () => {

  //     try {
  //       const response = await fetch('http://localhost:3000/campaigns').then(res=>res.json()); // Replace with your actual API endpoint URL
  //       console.log('response', response)
  //       setCampaigns(response);
  //     } catch (error) {
  //       console.error("Error fetching campaigns:", error);
  //       // Handle errors appropriately, e.g., display an error message to the user
  //     }

  //   };

  //   fetchCampaigns();

  // }, []);

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
  

  // useEffect(() => {
  //   const checkAppExistence = async () => {
  //     if (userId) {
  //       try {
  //         const response = await fetch(`http://localhost:3000/users/${userId}`); 
  //         console.log(response.status);
  //       } catch (error) {
  //         console.error(error);
  //         // Handle errors appropriately, e.g., display an error message
  //       }
  //     }
  //   };

  //   checkAppExistence();
  // }, [userId]);

  useEffect(() => {

    // if (!isAuthenticated) {
    //   // Handle case when user is not logged in (e.g., redirect to login)
    //   return;
    // }

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
    navigate('/campaign');
    
    // try {
    //   const response = await fetch(`http://localhost:3000/campaigns/getcamp/${id}`).then(res=>res.json()).then(data=>console.log('data', data.response)) // Replace with your actual API endpoint URL
      
      
    // } catch (error) {
    //   console.error("Error fetching campaigns:", error);
    //   // Handle errors appropriately, e.g., display an error message to the user
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
              <button onClick={() => getCampaignDetails(campaign.Id)}>View Details</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/create-campaign">Create new Campaign</Link>
      
    </div>
  );
};

export default CampaignList;
