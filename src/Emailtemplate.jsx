import React, { useState } from 'react'
import './Emailtemplate.css'
function Emailtemplate() {
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

  return (
    <div className='Emailtemplate'>

        <div>sender Email : {ChangeSDenderEmail ? <input  onChange={(e)=>{settempsenderEmail(e.target.value)}} placeholder='Enter new Email'/> :SenderEmail }
        
         <button onClick={UpdateEmail}>
            {ChangeSDenderEmail?'Update Email':'change Sender Email'}
            </button>
        </div>

        <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder='Enter Email Subject'>
        
        </textarea>
        <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder='Enter Email Body '>
        
        </textarea>
        <div className='emailsummary'>
            <p>Sender Email: {SenderEmail}</p>
            <div>Subjcet: {Subject}</div>
            <div> Email body{body}</div>
        </div>

        <button>Schedule Compaign</button>

    </div>
  )
}

export default Emailtemplate