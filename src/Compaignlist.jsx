import React, { useState } from 'react';
import './CampaignList.css'; // Import the CSS file

const CampaignList = () => {
    const campaigns=[
        {
            campaignId:'1',
            status:'scheduled', 
            name:'compaign1'

    },
    {
            campaignId:'2',
            status:'completed', 
            name:'compaign2'
    }
]
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleFilterChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (selectedStatus === 'all') {
      return true;
    } else {
      return campaign.status === selectedStatus;
    }
  });

  return (
    <div className="campaign-list-container">
      <div className="filter-container">
        <label htmlFor="filter-select">Filter by Status:</label>
        <select id="filter-select" value={selectedStatus} onChange={handleFilterChange}>
          <option value="all">All Statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="ongoing">Ongoing</option>
        </select>
      </div>

      <ul className="campaign-list">
        {filteredCampaigns.map((campaign) => (
          <li key={campaign.campaignId} className="campaign-item">
            <div className="campaign-details">
              <span className="campaign-name">{campaign.name}</span>
              <span className="campaign-status">{campaign.status}</span>
              <button>View Details</button>
            </div>
          </li>
        ))}
      </ul>
      
      <button style={{margin:'5px',color:'red'} }>Create new Compaign</button>
    </div>
  );
};

export default CampaignList;
