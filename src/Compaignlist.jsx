import React, { useState, useEffect } from 'react';
import './CampaignList.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setid, setname } from './features/counter/roomslice';
import axios from 'axios';

const CampaignList = () => {
  const campaignId = useSelector((state) => state.campaign.campaignId);
  const email = useSelector((state) => state.User.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Campaigns, setCampaigns] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [notverified, setnotverified] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [nummails, setnummails] = useState('')
  const [isascending, setisascending] = useState(true);
  const [isnameascending, setisnameascending] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage= 6;

  useEffect(() => {
    setUserEmail(email);
    const retrievedEmail = localStorage.getItem('userEmail'); // Retrieve from local storage (optional)
    setUserEmail(retrievedEmail || window.location.state?.email); // Check passed state or local storage
  }, []);

  useEffect(() => {
    const checkverified = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/isverified/${email}`);
        console.log(response.status);
        if (response.status !== 201) {
          setnotverified(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkverified();
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
  }, [email]);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('http://localhost:3000/campaigns/getallcamp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }), // Include JWT in authorization header
      });
      const data = await response.json();
      setCampaigns(data.campaigns);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // console log campaigns
  useEffect(() => {
    console.log(Campaigns)
  }, [Campaigns])
  

  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleFilterChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    setSearchActive(!!value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchActive(false);
  };

  const filteredCampaigns = Campaigns?.filter((campaign) => {
    if (selectedStatus === 'all') {
      return campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return campaign.status === selectedStatus && campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = filteredCampaigns?.slice(indexOfFirstCampaign, indexOfLastCampaign);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const getCampaignDetails = async (id, name) => {
    console.log(id, name);
    dispatch(setid({ id: id }));
    dispatch(setname({ name: name }));
    console.log('id', campaignId);
    navigate('/campaign-details');
  };

  const sendverifymail = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/verifymail/${email}`);
      const data = await response.json();
      alert('Verification mail sent successfully');
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., display error message)
    }
  };

  const handlegetlist = async(seg_id) => {
    try {
      const response = await fetch(`http://localhost:3000/segments/getsegment/${seg_id}`);
      const data = await response.json();
      console.log(data.csv);
      if(response.status===200){
        const csvData = data.csv;
        const handleDownload = () => {

          const csvContent = csvData.split('\n').join('\r\n');
          
          const listlen = csvContent.split('\n').length-1;
          
          setnummails(listlen);

          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
          // Create a temporary URL for the blob
          const url = window.URL.createObjectURL(blob);
      
          // Create a temporary anchor element
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'data.csv');
      
          // Append the anchor element to the body
          document.body.appendChild(link);
      
          // Trigger the click event on the anchor element
          link.click();
      
          // Remove the anchor element from the body
          document.body.removeChild(link);
        };
        handleDownload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handledateformat = (dateString)=>{
    const pad = (number) => {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    };
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const dayName = days[date?.getDay()];
    const monthName = months[date?.getMonth()];
    const formattedDate = `${dayName}, ${pad(date.getDate())} ${monthName} ${date.getFullYear()}, ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    return formattedDate;

  }
  const sortCampaignsBYdate = () => {
    if(isascending){
      setCampaigns([...Campaigns.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))]);
      setisascending(false);
    }else{
      setCampaigns([...Campaigns.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))]);
      setisascending(true);
    }
    
  };
  
  const sortCampaignsByname = () => {
    if(isnameascending){
      setCampaigns([...Campaigns.sort((a, b) => a.name.localeCompare(b.name))]);
      setisnameascending(false);
    }else{
      setCampaigns([...Campaigns.sort((a, b) => b.name.localeCompare(a.name))]);
      setisnameascending(true);
    }

  };
  
  const handlesortByName = () => {
    sortCampaignsBYdate();
  };
  const handleosrtbyname = () => {
    sortCampaignsByname();
  };
  

  return (

    <div className="campaign-list-container">
      {!notverified ?
        <>
          <div className='campaign-header'>
            <h1>Your Campaigns</h1>
            <p>
            <Link to="/campaign" className='Create-new-camp'>Create new Campaign</Link>
            </p>
          </div>
          <div className="filter-container">
            <label htmlFor="filter-select" className='campaign-filter'>Filter by Status:</label>
            <select id="filter-select" value={selectedStatus} onChange={handleFilterChange}>
              <option value="all">All Statuses</option>
              <option value="SCHEDULED">SCHEDULED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="RUNNING">RUNNING</option>
            </select>

            <div className="search-container">
              <input type="text" placeholder='Search campaign' value={searchQuery} onChange={handleSearch} />
              {searchActive && (
                <button className="clear-search" onClick={handleClearSearch}>
                  <span>&times;</span>s
                </button>
              )}
            </div>
          </div>

          <ul className="campaign-list">

          <li key='1' className="campaign-item" style={{color:"black",fontSize:'20px'}}>

              <div className="campaign-details">
              <span>Sn.</span>
              <span className="campaign-name" onClick={handleosrtbyname}>Campaign Name</span>
              <span className="campaign-status">Status</span>
              <span className="campaign-status" onClick={handlesortByName}>Created At/Completed At</span>
              <span className='campaign-mail' >Emails List</span>

              </div>
              
          </li>

            {currentCampaigns?.map((campaign,index) => (
              <li key={campaign.Id} className="campaign-item">

                <div className="campaign-details">
                  <span>{index+1}</span>
                  <span className="campaign-name">{campaign.name}</span>
                  <span className="campaign-status">{campaign.status}</span>
                  <span className="campaign-status">{handledateformat(campaign.created_at)}</span>
                  <span className='campaign-mail-list' onClick={()=>handlegetlist(campaign.segment_id)}>Emails List</span>

                </div>
                <button onClick={() => getCampaignDetails(campaign.Id, campaign.name)} disabled={campaign.status === 'SCHEDULED'}>View Analystics</button>
              </li>
            ))}
          </ul>

          <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {filteredCampaigns && (
          Array.from({ length: Math.ceil(filteredCampaigns.length / campaignsPerPage) }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => paginate(page)} className={currentPage === page ? 'active' : ''}>
              {page}
            </button>
          ))
        )}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredCampaigns.length / campaignsPerPage)}>
          Next
        </button>
      </div>
        </> : <p>Please verify your mail first <button onClick={sendverifymail}>send verify mail</button></p>}
    </div>

  );
};

export default CampaignList;
