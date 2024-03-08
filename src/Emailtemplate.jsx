import React, { useState } from 'react'
import './Emailtemplate.css'
import Emailvalidation from './Emailvalidation'

function Emailtemplate({recipients,campaignname}) {
   
    const [SenderEmail, setSenderEmail] = useState('aktyagi@gmail.com') // get user email from database 
    const [tempsenderEmail, settempsenderEmail] = useState('second')
    const [ChangeSDenderEmail, setChangeSDenderEmail] = useState(false)
    const [Subject, setSubject] = useState('')
    const [isnewtemplate,setisnewtemplate]=useState(false)
    const [displaysend,setdisplaysend]=useState(false)
    const [body, setbody] = useState('')
    const [istemplatesaved, setistemplatesaved] = useState(false)
    const UpdateEmail=(e)=>{
        if(ChangeSDenderEmail){
            setSenderEmail(tempsenderEmail);
            setChangeSDenderEmail(false);
        }else{
            setChangeSDenderEmail(true);
        }
    }

    const sendcapaign = async() => {
        
        await fetch('http://localhost:3000/createcampaign',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                campaignname:campaignname,
                Appid:'eee3156e75484852ace0300b077c44e0',
                segmentid:'64fe8386e10543258ef7e1bcb7ce3900',
                Templetename:'template_name1',
            }),
          }).then(res => res.json())
          .then((data)=>{
            if(data.status === 'success'){
                alert('campaign Created Successfully');
            }else{
                alert("there was an error creating campaign, please try again");
            }
          });


      };

      const verifyEmail=async()=>{

            await fetch(`http://localhost:3000/verifymail/${SenderEmail}`).then(res=>res.json())
            .then((data)=>{
                if(data.status==='success'){
                    alert('Verification mail sent successfully');
                }else{
                    alert(data.e);
                }
            });
      }
      const handletemplatesave=()=>{
        setistemplatesaved(true);
        setisnewtemplate(false);
        setdisplaysend(true);
      }
      const handleedittemplate=()=>{
            setisnewtemplate(true);
            setistemplatesaved(false);
            setdisplaysend(false);
      }     
    

  return (

    <div className='Emailtemplate'>

        <div className='senderemail'> <p style={{color:'rgb(238, 85, 102)'}}>sender Email</p> : {ChangeSDenderEmail ? <input  onChange={(e)=>{settempsenderEmail(e.target.value)}} placeholder='Enter new Email'/> :SenderEmail }
        
         <button onClick={UpdateEmail}>
            {ChangeSDenderEmail?'Update Email':'change Sender Email'}
            </button>
        </div>

        {/* <button onClick={verifyEmail}>Verify Email</button> */}

        <p>------List of templates from database or aws command -----</p>

        <br />
        
       {!istemplatesaved&&<button onClick={()=>{setisnewtemplate(!isnewtemplate)}} disabled={istemplatesaved}>Create New Template</button>}
       {istemplatesaved&& <button onClick={handleedittemplate}>Edit template</button>}
        
        {isnewtemplate && <div className='Template' >
        <input type="text" placeholder='Enter Template Name'/>
        <br />
        <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder='Enter Email Subject' onChange={(e)=>{setSubject(e.target.value)}}>
        
        </textarea>
        <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder='Enter Email Body ' onChange={(e)=>{setbody(e.target.value)}}>
        
        </textarea>
        <br />
        
          {Subject.trim() && body.trim()&&!istemplatesaved? (
            <button onClick={handletemplatesave}>Save Template</button>
            ) :!istemplatesaved&& (
            <button disabled>Save Template (Disabled)</button>
            )}
        </div>}
        
        {istemplatesaved&&<div className='emailsummary' >
            <p>Sender Email: {SenderEmail}</p>
            <div>Subjcet: {Subject}</div>
            <div> Email body{body}</div>
        </div>}

        {displaysend ? (
            <button onClick={sendcapaign}>Schedule Camapign</button>
            ) : (
            <button disabled>Schedule Camapign (Disabled)</button>
            )}
    </div>
  )
}

export default Emailtemplate