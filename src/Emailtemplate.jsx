import React, { useState } from 'react'
import './Emailtemplate.css'
import Emailvalidation from './Emailvalidation'

function Emailtemplate({recipients}) {
   
    const [SenderEmail, setSenderEmail] = useState('aktyagi@gmail.com')
    const [tempsenderEmail, settempsenderEmail] = useState('second')
    const [ChangeSDenderEmail, setChangeSDenderEmail] = useState(false)
    const [Subject, setSubject] = useState('')
    const [body, setbody] = useState('')

    const UpdateEmail=(e)=>{
        if(ChangeSDenderEmail){
            setSenderEmail(tempsenderEmail);
            setChangeSDenderEmail(false);
        }else{
            setChangeSDenderEmail(true);
        }
    }

    const generateMailtoLink = async() => {

        console.log("making a send mail call to aws pinpoint");

        await fetch('http://localhost:3000/sendmail').then(res=>res.json()).then(data=>{

            if(data=="success"){
                alert("email sent successfully")
            }else{
                alert("Failed to send email")
            }
        });

        // client side email send using mail or local app.
         // this is client side mailing which is not recommended.

        console.log(recipients);    

        const to = recipients.join(',');
    
        const subject = encodeURIComponent(Subject);

        const Body = encodeURIComponent(body);

        window.location.href = `mailto:${to}?subject=${subject}&body=${Body}`;

      };
    

  return (

    <div className='Emailtemplate'>

        <div className='senderemail'> <p style={{color:'rgb(238, 85, 102)'}}>sender Email</p> : {ChangeSDenderEmail ? <input  onChange={(e)=>{settempsenderEmail(e.target.value)}} placeholder='Enter new Email'/> :SenderEmail }
        
         <button onClick={UpdateEmail}>
            {ChangeSDenderEmail?'Update Email':'change Sender Email'}
            </button>
        </div>

        <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder='Enter Email Subject' onChange={(e)=>{setSubject(e.target.value)}}>
        
        </textarea>
        <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder='Enter Email Body ' onChange={(e)=>{setbody(e.target.value)}}>
        
        </textarea>

        <div className='emailsummary '>
            <p>Sender Email: {SenderEmail}</p>
            <div>Subjcet: {Subject}</div>
            <div> Email body{body}</div>
        </div>

        <button className='btn' onClick={generateMailtoLink}>Schedule Compaign</button>
        <button className='btn' onClick={generateMailtoLink}>Send compaign</button>
   
    </div>
  )
}

export default Emailtemplate