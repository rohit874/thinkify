import './App.css';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StoreAllEmails, Filter} from './Action'
import EmailBody from './EmailBody';

function App() {
  const [emailOpen, setEmailOpen] = useState(false);
  const [filterEmails, setFilterEmails] = useState([]);
  const [emailDetails, setEmailDetails] = useState({});
  const [filterBy, setFilterBy] = useState("unread");
  const allEmails = useSelector(state=>state.emailReducer);
  const dispatch = useDispatch();

  useEffect(()=>{     //getting all emails list
    fetch('https://flipkart-email-mock.vercel.app')
    .then(response => response.json())  // convert to json
    .then((json) =>{setFilterEmails(json.list); dispatch(StoreAllEmails(json.list))}) 
    .catch(err => console.log('Request Failed', err)); // Catch errors
  },[]);

  function GetEmail(data){   //getting clicked email details
    if (data.id===emailDetails.id) {
      return; 
    }
    fetch(`https://flipkart-email-mock.vercel.app/?id=${data.id}`)
    .then(response => response.json())  // convert to json
    .then((json) =>{
       setEmailDetails({...data,body:json.body})
       setEmailOpen(true);
      })
    .catch(err => console.log('Request Failed', err));
  }

  useEffect(()=>{ //filter emails
    let filter=allEmails;
      filter = allEmails.filter((data)=>{
        if (filterBy=="unread") {
            return data.read==false;
        }
        else{
            return data[filterBy]==true;
        }
    });
  setFilterEmails(filter);
  },[filterBy]);

  useEffect(()=>{     // include the changes in the filtered emails
    let changesEmails = allEmails.filter(data=> filterEmails.find(mailData=>mailData.id===data.id));
    setFilterEmails(changesEmails);
  },[allEmails])
  
function getDate(date){ //format date from milisecond to (dd/mm/yyyy hh:mm am/pm)
  const d = new Date(date);
  let day = d.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  let month = d.getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  let year = d.getFullYear();
  let hour = (d.getUTCHours()<13?d.getUTCHours():d.getUTCHours()-12).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  let amPm = d.getUTCHours()>=12?"PM":"AM";
  let minutes = d.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  return `${day}/${month}/${year} ${hour}:${minutes}${amPm}`;
}


  return (
    <div className="App">
      <main style={{flexDirection:!emailOpen?"column":"row"}}>
      <div className='filters'><span>Filter By:</span><button className={filterBy=="unread"?'filters_button_active':""} onClick={()=>setFilterBy("unread")}>Unread</button><button className={filterBy=="read"?'filters_button_active':""} onClick={()=>setFilterBy("read")}>Read</button><button className={filterBy=="favorite"?'filters_button_active':""} onClick={()=>setFilterBy("favorite")}>Favorites</button></div>
      <section className='email_list'>
        {
          filterEmails.map((data)=>{
            return(
              <div className='email' onClick={()=>GetEmail(data)} key={data.id} 
              style={{
                border: data.id==emailDetails.id?"1px solid #E54065":"1px solid #CFD2DC",
                backgroundColor:data.read?"#F2F2F2":"white"
                }}>
              <div className='profile_pic'>{data.from.name.charAt(0).toUpperCase()}</div>
              <div className='email_content'>
                <p>From: <span>{data.from.name} {`<${data.from.email}>`}</span></p>
                <p>Subject: <span>{data.subject}</span></p>
                <p>{data.short_description}</p>
                <time>{getDate(data.date)} <span className='favorite_flag'>{data.favorite&&"Favorite"}</span></time>
              </div>
          </div>
            )
          })
        }

      </section>
      { emailOpen && 
      <EmailBody
      emailDetails={emailDetails}
      time={getDate(emailDetails.date)}          
       />
}
      </main>
    </div>
  );
}

export default App;
