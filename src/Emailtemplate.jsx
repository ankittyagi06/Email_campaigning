import React, { useState,useEffect } from 'react'
import './Emailtemplate.css'
import Emailvalidation from './Emailvalidation'
import { useSelector } from 'react-redux';
import Template from './Template';
import DateTimeConverter from './Components/DateTimeConverter';
function Emailtemplate({segmentid}) {
    console.log(segmentid);
    const [SenderEmail, setSenderEmail] = useState('aktyagi@gmail.com') // get user email from database 
    const [tempsenderEmail, settempsenderEmail] = useState('second')
    const [ChangeSDenderEmail, setChangeSDenderEmail] = useState(false)
    const [Subject, setSubject] = useState('')
    const [isnewtemplate,setisnewtemplate]=useState(false)
    const [displaysend,setdisplaysend]=useState(false)
    const [body, setbody] = useState('')
    const [istemplatesaved, setistemplatesaved] = useState(false)
    const [templates, settemplates] = useState([])
    const [templatename, settemplatename] = useState('')
    const [campaignstarttime, setcampaignstarttime] = useState('')
    const [camapignendtime, setcamapignendtime] = useState('')
    const email = useSelector((state)=>state.User.email);
    const campaignname = useSelector((state)=>state.campaign.name);
    useEffect( () => {
        const getalltemplates=async() => {
        try {
        const res=await fetch('http://localhost:3000/templates/getalltemplates/aktyagi18052002@gmail.com') 
        if(res.status === 200){
            const data=await res.json();
            settemplates(data);
            console.log('alltemplates',templates);
        }  
    } catch (error) {
        console.log(error);
    }
    }
    getalltemplates();}
    , []);
    
    const UpdateEmail=(e)=>{
        if(ChangeSDenderEmail){
            setSenderEmail(tempsenderEmail);
            setChangeSDenderEmail(false);
        }else{
            setChangeSDenderEmail(true);
        }
    }

    const sendcapaign = async(starttime,endtime) => {
        console.log(starttime, endtime);
        if(!campaignname || !segmentid || !templatename){
            alert('Please fill all the fields');
            return;
        }
       try {
        const res= await fetch('http://localhost:3000/campaigns/newcamp',{
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
                 email:'aktyagi18052002@gmail.com',
                 campaignname:campaignname,
                 Appid:'eee3156e75484852ace0300b077c44e0',
                 segmentid:segmentid,
                 Templetename:templatename,
                 starttime:starttime,
                 endtime:endtime
             }),
           })//.then(res => res.json())
           
             if(res.status === 201){
                 alert('campaign Created Successfully');
 
             }else{
                 alert("there was an error creating campaign, please try again");
             }
       } catch (error) {
        console.log(error);
       }
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
      
      const handletemplatesave=async()=>{

        if(!Subject|| !body|| !email || !templatename){
            alert('Please Fill all the fields!');
            return;
        }
        // const res =await fetch('http://localhost:3000/templates/new',{
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         email:email,
        //         name:templatename,
        //         subject:Subject,
        //         body:body,
        //     }),
        //   });
        //     if(res.status === 200){
        //         alert('Template Created Successfully');
        //     }else{
        //         alert("There was an error creating template, please try again");
        //     }
        setistemplatesaved(true);
        setisnewtemplate(false);
        setdisplaysend(true);
        setpreviewtemp(true);
      }

      const handleedittemplate=()=>{
            setisnewtemplate(true);
            setistemplatesaved(false);
            setdisplaysend(false);
      }   
        
  return (
    <div className='Emailtemplate'>
        {/* <button onClick={verifyEmail}>Verify Email</button> */}

        <h1>Select existing template</h1>
        <div className="alltemplates">
            {templates.map((template,index)=>{
                return <div className='template' key={index}>
                    <span>{template.name}</span>
                    <button onClick={()=>{settemplatename(template.name);setdisplaysend(true)}}>Edit</button>
                </div>
            })}

        </div>

        <br />
        
       {!istemplatesaved&&<button onClick={()=>{setisnewtemplate(!isnewtemplate),setdisplaysend(false)}} disabled={istemplatesaved}> Create New Template </button>}
       {istemplatesaved && <button onClick={handleedittemplate}>Edit template</button>}
        
        {isnewtemplate && <div className='Template' >
        <input type="text" placeholder='Enter Template Name' value={templatename} onChange={(e)=>{settemplatename(e.target.value)}}/>
        <br />
        <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder='Enter Email Subject' value={Subject} onChange={(e)=>{setSubject(e.target.value)}}>
        
        </textarea>
        <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder='Enter Email Body ' value={body} onChange={(e)=>{setbody(e.target.value)}}>
        
        </textarea>
        <br />
        
          {Subject.trim() && body.trim() && templatename ?(
            <button onClick={handletemplatesave}>Save Template</button>
            ) :(
            <button disabled>Save Template (Disabled)</button>
            )}
        </div>}

        
        {istemplatesaved && <div className='emailsummary' >
            <Template Header={Subject} Body={body}/>
        </div>}

        {displaysend ? (
            <DateTimeConverter sendcapaign={sendcapaign}/>
            ) : (
            <button disabled> Schedule Camapign (Disabled)</button>
            )}
    </div>
  )
}

export default Emailtemplate