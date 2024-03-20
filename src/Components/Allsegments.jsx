import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListContent, Button, Image, List } from 'semantic-ui-react'
import './Allsegments.css'
function Allsegments() {
    const email = useSelector((state) => state.User.email);
    const Navigate = useNavigate();
    const [segments, setsegments] = useState([])
    useEffect(() => {
        const getallsegments=async()=>{
            await fetch(`http://localhost:3000/segments/getsegments/${email}`).then(response=>response.json()).then(data=>{console.log('data', data)
            setsegments(data)
           });
        }
        getallsegments();
    }, []);

    const handlesegmentdownload = async(s3url) => {
            await fetch(`http://localhost:3000/segments/downloadsegment`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({s3url:s3url}), // Include JWT in authorization header
            }).then(response => response.json()).then(data => {;
            
                const csvData = data.csv;
                const handleDownload = () => {
        
                  const csvContent = csvData.split('\n').join('\r\n');
                  
                  const listlen = csvContent.split('\n').length-1;
                  
                  //setnummails(listlen);
        
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
            });
    }

    
  return (
    <div className='segment-list'>
        <h1>Your Segments</h1>
    <div>
    <Button onClick={()=>Navigate('/newsegment')}>Create New Segment</Button>
    <Button>Import From database</Button>
    </div>
    

    <List divided verticalAlign='middle'>

    {segments.map((segment, index) => (<ListItem>
      <ListContent floated='right'>
      <Button onClick={()=>handlesegmentdownload(segment.s3url)}>Download segment</Button>
      </ListContent>
      <ListContent>{index+1}{`_`}{segment.name}</ListContent>
    </ListItem>
    ))}

    </List>
    </div>
  )
}

export default Allsegments