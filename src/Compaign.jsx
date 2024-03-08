import React, { useRef } from 'react'
import './compaign.css'
import { useState } from 'react';
import Papa from "papaparse";
import Emailtemplate from './Emailtemplate';
import Emailvalidation from './Emailvalidation';
function Compaign() {
    const [nameofcampaign, setnameofcampaign] = useState('')
    const [mailinglist,setmailinglist]=useState(null);
    const [error, setError] = useState("");
    const [data, setData] = useState([]);
    const [tempdata, settempdata] = useState(null)
    const fileInputRef = useRef(null);
    const [open, setopen] = useState(false)
    const [showAll, setshowAll] = useState(true)
    const [segments,setsegments]= useState([])
    const [segmentname, setsegmentname] = useState('')
    const [segmentid, setsegmentid] = useState('')
    const [openinput, setopeninput] = useState(false)
    function openFileInput() {
        fileInputRef.current.click();
    }
        // function to get the file as input
    function getfileinput(e){ 
        const allowedExtensions = ["csv"];
        setError("");
        if(e.target.files.length){
            const inputfile = e.target.files[0];
            const fileExtension = inputfile?.type.split("/")[1];
            if(!allowedExtensions.includes(fileExtension)){
                setError("file extension is not valid");
                return;
            }
            setmailinglist(inputfile);
        }
        handleParse();
    }

    const uploadcsvtos3=async()=>{

         //transform csv to desired format 
            
        

        // upload mailing list to s3  




        // get import command 

        // create segment command 

        // create campaign command 

    }

    const handleParse = () => {

        setopen(true);
        // If user clicks the parse button without a file, show an error
        
        // Initialize a reader which allows the user to read any file or blob.
        const reader = new FileReader();
    
        // Event listener on reader when the file loads, we parse it and set the data.
        reader.onload = ({ target }) => {
            const csv = Papa.parse(target.result, {
                header: false, // Since CSV has no header, set this to false
            });
    
            const parsedData = csv?.data;
    
            // Extract email addresses from parsed data and store them in an array
            const emailArray = parsedData.map(row => row[0]);
    
            // Set the email array in the component state
            setData(emailArray);
    
            console.log("Parsed email data:", emailArray);
    
            // If you need to do something with the email addresses, you can proceed here
        };
    
        // Read the file as text
        reader.readAsText(mailinglist);
       
    };
    // function to display the file (convert the content into nany array)
    const toggleShowAll = () => {
        setshowAll(!showAll);
      };

      const handleopen=()=>{

        if(open){
            setopen(false);
        }else{

            handleParse();
            setopen(true)
        }

      }
    const getallsegments=async()=>{
        const retrievedEmail = localStorage.getItem('userEmail');
        await fetch(`http://localhost:3000/segments/getsegments/${retrievedEmail}`).then(response=>response.json()).then(data=>{console.log('data', data)
        setsegments(data);});
    }

    const createnewsegment=async()=>{

        setopeninput(false);
        try{
       await fetch(`http://localhost:3000/uploadtos3/${segmentname}`).then(response=>response.json())
       .then(data=>{if(data.status==="success")
       {alert("success")}
       else
       {alert("Something went wrong")}});

        }
        catch(e){
            console.log('error', e)
            return;
  }
       
        //.then(response=>response.json()).then(data=>{console.log('data', data)});
    }
    const choosesegment = (segid) => {
        setsegmentid(segid);
    }


  return (

    <div className='compaign'>
        <div className='mailing-list'>
            <button className='Get-list' onClick={getallsegments}>choose your Mailing List or create new</button>
        </div>

        <div className='display-mailing-list'>
            
        {/* {mailinglist ? <button onClick={handleopen}> {open? 'Hide List': 'open list'}</button> : 'List is not fetched yet'} */}
        <h5>your segments</h5>

        {
            segments?.map((segment)=>(

                <p className='segement' >
                    <span>{segment.name}</span>
                    <button onClick={()=>choosesegment(segment.Id)}>select this segment</button>
                </p>
                
            ))
        }
        </div>
        

        <p>OR</p>

        {!openinput && <button onClick={()=>{setopeninput(true)}}>New segment</button>}
        { openinput && <input type="text" placeholder='Enter segment name' className='segement-input' onChange={(e)=>setsegmentname(e.target.value)} />}
        {openinput&&<button onClick={createnewsegment}>Create new segment</button> }
       <p>{segmentname}</p>

        {open && <div className='list-items' style={{ marginTop: "3rem" }}>

                    {showAll
          ? data.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          : data.slice(0, 10).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            <button onClick={toggleShowAll}>
        {showAll ? 'Show Less' : 'Show All'}
        
      </button> 
                </div>
        }


        <Emailtemplate recipients={data} campaignname={nameofcampaign}/>
        
    </div>
  )
}

export default Compaign