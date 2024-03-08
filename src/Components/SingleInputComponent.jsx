import React, { useState } from 'react';
import './SingleInputComponent.css'; // Import CSS file for styling
import { useSelector,useDispatch } from 'react-redux';
import { setid ,setname} from '../features/counter/roomslice';
import { useNavigate } from 'react-router-dom';
const SingleInputComponent = () => {
    const campaignname = useSelector((state)=>state.campaign.name);
    const Navigate=useNavigate();
    const dispatch=useDispatch();
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options)+' campaign';
  };

  const currentDate = formatDate(new Date());

  const [date, setDate] = useState(currentDate);
  // Function to handle input change
  const handleInputChange = (event) => {
    dispatch(setname({name: date}));
    Navigate('/create-campaign');
  };

  return (
    <div className="single-input-container">
      <div className="bordered-component">
        <label htmlFor="">Name Your Campaign</label>
        <input
          type="text"
          value={date}
          onChange={(e)=>{setDate(e.target.value)}}
          className="custom-input"
          placeholder='Enter your Campaign name'
        />
      </div>
      <button onClick={handleInputChange}>Next</button>
      <p>{campaignname}</p>
    </div>
  );
};

export default SingleInputComponent;
