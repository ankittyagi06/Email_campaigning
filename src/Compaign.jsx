import React, { useRef } from 'react'
import './compaign.css'
import { useState } from 'react';
import Papa from "papaparse";
import Emailtemplate from './Emailtemplate';
import Emailvalidation from './Emailvalidation';
function Compaign() {

    const [mailinglist,setmailinglist]=useState(null);
    const [error, setError] = useState("");
    const [data, setData] = useState([]);
    const [tempdata, settempdata] = useState(null)
    const fileInputRef = useRef(null);
    const [open, setopen] = useState(false)
    const [showAll, setshowAll] = useState(true)

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


  return (

    <div className='compaign'>
        
        <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={getfileinput}
      />

        <div className='mailing-list'>
            New Comapign
            <button className='Get-list' onClick={openFileInput}>Get Mailing List</button>
        </div>

        <div className='display-mailing-list'>
            
        {mailinglist ? <button onClick={handleopen}> {open? 'Hide List': 'open list'}</button> : 'List is not fetched yet'}
        
        </div>
       

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
        <Emailvalidation/>
        <Emailtemplate recipients={data}/>
        
    </div>
  )
}

export default Compaign