import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './newsegment.css';
import { useRef } from 'react';
import { FormField, Button, Checkbox, Form,FormGroup } from 'semantic-ui-react'
import Maillist from './EmailList'
function Newsegment() {
  const [emails, setEmails] = useState([]);
  const [segmentname, setSegmentName] = useState('');
  const [addmanually, setaddmanually] = useState(false)
  const [inputemail, setinputemail] = useState('')
  const inputRef = useRef('');
  const email = useSelector((state) => state.User.email);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
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
    console.log(csvContent);
    setSegmentContent(csvContent);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    setDownloadLink(url);
    setSegmentEnable(true);
  };

  const handleCreateSegment = async () => {
    try {
      if (!emails.length) {
        alert('Please upload your file');
        return;
      }
      if (!segmentname) {
        alert('Please enter your segment name');
        return;
      }
      const csvContent = `ChannelType,Address\n${emails.join('\n')}`;
      if (!csvContent) {
        alert('Please download your file');
        return;
      }

      const response = await fetch('http://localhost:3000/segments/newsegment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: segmentname,
          segmentcontent: csvContent,
        }), // Include JWT in authorization header
      });
      const data = await response.json();
      if (response.status === 201) {
        alert('Your segment has been created successfully');
        navigate('/campaign');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong, please try again');
    }
  };

  const handleImportClick = () => {
    inputRef.current.click();
  };

  const handleDeleteEmail = (index) => {
    console.log(index);
    const updatedEmails = [...emails]; // Create a copy of the emails array
    updatedEmails.splice(index, 1); // Remove the email at the specified index
    setEmails(updatedEmails); // Update the state with the modified array
  };
  const handleAddManually = () => {
    setaddmanually(!addmanually)
  }

  const handleAddEmailManually = () => {
    setaddmanually(true)
    if(!inputemail){
      alert('Please enter email address')
    }
    const emailToAdd = inputemail;
    if (emailToAdd && validateEmail(emailToAdd)) {
      setEmails([...emails, `EMAIL,${emailToAdd}`]);
    } else {
      alert('Invalid email address');
    }
    setinputemail('');
  };

  return (
    <div className='Newsegment'>
    
    <Form className='template-create-form'>
    <h1>Create New Segment</h1>
    <FormField>
    <input
        className='form-row-template-input'
        type='text'
        placeholder='Enter Segment name'
        value={segmentname}
        onChange={(e) => setSegmentName(e.target.value)}
      />
    </FormField>
    <FormField>
      <label>Last Name</label>
      <input placeholder='Last Name' />
    </FormField>
    <FormGroup unstackable widths={2}>

    <Button className='form-row-button' onClick={handleImportClick}>Import CSV File</Button>
    <Button className='form-row-button' onClick={handleAddManually}>Add Manually</Button>
      
    </FormGroup>
    
    {addmanually&&
    <FormField>
    <input type="text" placeholder='Enter Email address' value={inputemail} onChange={(e)=>setinputemail(e.target.value)} />
    <Button className='form-row-button' onClick={handleAddEmailManually}>Add</Button>
    </FormField>}

    <FormGroup>
    <Button type='submit' disabled={emails.length === 0} onClick={handleCreateSegment}>Create Segment</Button>
    <Maillist emails={emails} deletemail={handleDeleteEmail}/>
    </FormGroup>

    </Form>
      <input type='file' ref={inputRef} onChange={handleFileUpload} style={{ display: 'none' }} />

    </div>
  );
}

export default Newsegment;
