import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './newsegment.css'; 
import { useRef } from 'react';
function Newsegment() {
    const [emails, setEmails] = useState([]);
    const [downloadLink, setDownloadLink] = useState(null);
    const [segmentenable, setsegmentenable] = useState(false)
    const [segmentname, setsegmentname] = useState('')
    const [segmentid, setsegmentid] = useState('')
    const  [segmentcontent, setsegmentcontent] = useState('')
    const inputref = useRef('');
    const email = useSelector((state)=>state.User.email);
    const navigate= useNavigate();

    const handleFileUpload = (event) => {
        console.log('me click')
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          const parsedEmails = parseCSV(text);
          setEmails(parsedEmails);
        };
        reader.readAsText(file);
      };

      const parseCSV = (text) => {
        const rows = text.split('\n');
        const parsedEmails = [];
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].trim();
          if (row !== '') {
            const columns = row.split(',');
            const email = columns[0].trim();
            if (validateEmail(email)) {
              parsedEmails.push(`EMAIL,${email}`);
            }
          }
        }
        return parsedEmails;
      };

    const validateEmail = (email) => {
      // You can implement a proper email validation logic here
      return /\S+@\S+\.\S+/.test(email);
    };

    const handleDownload = () => {
    const csvContent = `ChannelType,Address\n${emails.join('\n')}`;
    console.log(csvContent)
    setsegmentcontent(csvContent);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    setDownloadLink(url);
    setsegmentenable(true);
  };

  const handlecreatesement =async()=>{
    try {
    if(!emails.length){
        alert("please upload your file")
        return;
    }
    if(!segmentname){
        alert("please enter your segment name")
        return;
    }
    const csvContent = `ChannelType,Address\n${emails.join('\n')}`;
    if(!csvContent){
        alert("please download your file")
        return;
    }
    
    const response = await fetch('http://localhost:3000/segments/newsegment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email:email,
        name:segmentname,
        segmentcontent:csvContent
      }), // Include JWT in authorization header
    });
    const data = await response.json();
    if(response.status===201){
        alert("your segment has been created successfully");
        navigate('/campaign')
    }
  } catch (error) {
    console.error(error);
    alert("something went wrong, please try again");
  }
  }
  const handleimportclick = () => {
    inputref.current.click();
  };
  return (

    <div>
        <input type="text" className="seg-name-input" placeholder='Enter Segment name' onChange={(e)=>setsegmentname(e.target.value)}/>
        <button onClick={handleimportclick}>Import csv File</button>
        <input type="file" ref={inputref} onChange={handleFileUpload} style={{display:'none'}}/>
        <button className="segmentbutton" disabled={emails.length === 0 }onClick={handlecreatesement}>Save Segment</button>
    </div>

  )
}
export default Newsegment







