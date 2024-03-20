import React, { useEffect, useRef } from 'react'
import './compaign.css'
import { useState } from 'react';
import Emailtemplate from './Emailtemplate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setsegmentId} from './features/counter/roomslice';
import { Form, Input, Select } from 'semantic-ui-react';
import {setname} from './features/counter/roomslice';

function Compaign() {

    const fileInputRef = useRef(null);
    const [open, setopen] = useState(false)
    const [showAll, setshowAll] = useState(true)
    const [segments,setsegments]= useState([])
    const [opensegments, setopensegments] = useState(false)
    const campaignname = useSelector((state)=>state.campaign.name);
    const segmentId = useSelector((state)=>state.campaign.segmentId);
    const [selectOptions, setselectOptions] = useState([])
    const [senderemail,setsenderemail] = useState('')
    const [subject, setsubject] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(segmentId);

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options)+' campaign';
  };
  const currentDate = formatDate(new Date());
  const [date, setDate] = useState(currentDate);
  dispatch(setname(date));
  
    useEffect(() => {
        const getallsegments=async()=>{
            setopensegments(true);
            const retrievedEmail = localStorage.getItem('userEmail');
            await fetch(`http://localhost:3000/segments/getsegments/${retrievedEmail}`).then(response=>response.json()).then(data=>{console.log('data', data)
            setsegments(data)
            setselectOptions(()=>data?.map((segment,index) => ({
                key: index,
                text: segment.name,
                value: segment.Id // You can use segment.id or any unique identifier as the value
              })));});
        }
        getallsegments();
    }, [])
    

    // function openFileInput() {
    //     fileInputRef.current.click();
    // }

    // function getfileinput(e){ 
    //     const allowedExtensions = ["csv"];
    //     setError("");
    //     if(e.target.files.length){
    //         const inputfile = e.target.files[0];
    //         const fileExtension = inputfile?.type.split("/")[1];
    //         if(!allowedExtensions.includes(fileExtension)){
    //             setError("file extension is not valid");
    //             return;
    //         }
    //         setmailinglist(inputfile);
    //     }
    //     handleParse();
    // }
   
    // const toggleShowAll = () => {
    //     setshowAll(!showAll);
    //   };

    //   const handleopen=()=>{

    //     if(open){
    //         setopen(false);
    //     }else{

    //         handleParse();
    //         setopen(true)
    //     }

    //   }

    const createnewsegment=async()=>{
          navigate('/newsegment');
        //.then(response=>response.json()).then(data=>{console.log('data', data)});
    }
    const handleemailchange = (e,{value}) =>{
        setsenderemail(value);
    }
    const handleSelectChange = (e, { value }) => {
        console.log(value);
        const selectedSegment = segments.find(segment => segment.Id === value);
        dispatch(setsegmentId({segmentId:selectedSegment.Id}));
        console.log(segmentId);
      };
    const handlesubjectchange = (e, {value}) =>{
        setsubject(value);
    }
    const handlecampaignnamechange = (e, {value}) =>{
      setDate(value);
      dispatch(setname(value));
    }


  return (
     <div className='compaign'>
    {/* //     <h4 className='campaign-name'>Your Campaign Name: {campaignname}</h4> */}
        {/* <div className='segment-list'>
            {!opensegments&&<button className='Get-list' >Click Here to choose from your existing Segments </button>}
        </div> */}
    <Form className='new-campaign-form'>

    <Form.Field
          control={Input}
          label='Enter campaign Name'
          placeholder='Enter camapign name'
          name='selectOption'
          value={date}
          onChange={handlecampaignnamechange}
        />

    <Form.Group widths='equal' className='form-grp'>
        <Form.Field
          control={Select}
          label='Select segment'
          options={selectOptions}
          placeholder='Select option'
          name='selectOption'
          value={segmentId}
          onChange={handleSelectChange}
        />
      <Form.Button label='create new'primary onClick={createnewsegment}>New Segment</Form.Button>
      </Form.Group>
      <Form.Field
        control={Input}
        label='Enter Sender Email address'
        placeholder='Enter Subject'
        type='text'
        name='password'
        value={senderemail}
        onChange={handleemailchange}
        />
        <Form.Field
        control={Input}
        label='Subject'
        placeholder='Enter Subject'
        type='text'
        name=''
        value={subject}
        onChange={handlesubjectchange}
        />
      </Form>
      <Emailtemplate senderemail ={senderemail} subject ={subject} campaignname ={date}/>
    </div>
  )
}

export default Compaign