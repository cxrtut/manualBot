import React, { useContext, useState } from 'react'
import './Main.css'
import { FaUser, FaRobot, FaPaperclip, FaImages, FaPaperPlane } from 'react-icons/fa';
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import axios from 'axios';

const Main = () => {

  const { onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input
  } = useContext(Context);

  // 

  
  // 
  const [ files, setfiles ] = useState();
  const [ progress, setProgress ] = useState({ started: false, pc: 0 });
  const [ msg, setMsg ] = useState("");

  function handleUpload() {
    if(!files){
      console.log("No file seleted");
      return;
    }
    
    const fd = new formData();
    for(let i=0; i<files.length; i++) {
      fd.append(`file${i+1}`, files[i]);
    }

    setMsg("Uploading...");
    setProgress(prevState => {
      return {...prevState, started: true}
    })

    axios.post('http://httpbin.org/post', fd, {
      onUploadProgress: (progressEvent) => { setProgress(prevState => {
          return {...prevState, pc: progressEvent.progressEvent*100}
        }) },
        headers: {
          'Content-Header': 'value',
        }     
    })
    .then((res) => {
      setMsg("File uploaded successfully");
      console.log(res.data);
    })
    .catch((err) => {
      setMsg("Error uploading file");
      console.log(err);
    })
  }


  // 
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    // handle the item click event
    console.log(`Item clicked: ${item}`);
    setIsOpen(false);
  };
  // 


  return (
    <div className='main'>
      <div className="nav">
        <p>MMS AI</p>
        <FaUser size={18} onClick={handleToggle} />
        {
          isOpen && (
            <div className="popup">
              <ul>
                <li>Profile</li>
                <li>Account</li>
                <li>Logout</li>
              </ul>
            </div>
          )}
      </div>
      <div className="main-container">
        {showResult
          ? <div className="result">
            <div className='result-title'>
              <FaUser size={18} />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <FaRobot size={18} />
              {loading
                ? <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }
            </div>

          </div>
          : <>
            <div className="greet">
              <p><span>Hello, Junior Ai MMS Bot.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        }


        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
            <div>
              {/* <img src={assets.gallery_icon} width={30} alt="" /> */}
              {/* Attachment Icon */}
              <label htmlFor="file-upload">
                <FaPaperclip size={18} style={{ cursor: 'pointer' }} />
              </label>
              {/* <input
                id="file-upload"
                type="file"
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleUpload}  // This function will handle the file upload event
              /> */}

              <value onChange={ (e) => { setfiles(e.target.files) } } type="file" multiple/>
              <button onClick={ handleUpload }>upload</button>
              
              { progress.started && <progress max="100" value={progress.pc}></progress> }
              { msg && <span>{msg}</span> }

              {input ? <FaPaperPlane onClick={() => onSent()} size={18} style={{ cursor: 'pointer' }} /> : null}
            </div>
          </div>

          <p className="bottom-info">
            The South African Manual Management Regulatory Authority is the organisation in charge of regulating the use of all Dignostics Manual throughout the country.
            Your privacy is our concern.
          </p>
          
        </div>
      </div>
    </div>
  )
}

export default Main
