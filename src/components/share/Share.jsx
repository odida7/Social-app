import React, { useRef, useState } from 'react'
import './share.css'
//import img3 from '../../img/3.jpg'
import { MdPermMedia } from "react-icons/md";
import { BsPlayCircle } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegTimesCircle } from "react-icons/fa";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  
  const {user} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append('name', fileName);
      data.append('file', image);
      newPost.image = fileName;
       console.log(newPost);
      try{
         await axios.post('/upload', data)
      }catch(error){
        console.log(error)
      }
    }

    try{
      await axios.post('/posts', newPost)
      window.location.reload();
    }catch(error){
      console.log(error)
    }
    
  }

    // Reset Post Share
 /* const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  }; */


  return (
    <div className='share'>
      <div className="sharetop">
        <Link to={`/profile/${user._id}`}>
        <img src={user.profilePicture ? PF + user.profilePicture : PF + 'noAvatar.png'} alt='' className='shareimg'/> 
        </Link>

        <input type='text' 
         placeholder={'Whats happening' + ' ' + user.firstname + '!'}
         className='shareinput'
         ref={desc}
         />

      </div>
     <hr className='hr'></hr>
      <form className="sharebottom" onSubmit={handleSubmit}>
        <div className="option">
          <div onClick={()=>imageRef.current.click()}>
            <MdPermMedia  style={{ color: "blue", fontSize: "20px" }}/>
           <span>Photo</span> 
          </div> 
          
          <div>
            <BsPlayCircle style={{ color: "red", fontSize: "20px" }}/>
            <span>Video</span>
          </div>
          <div>
            <GoLocation style={{ color: "green", fontSize: "20px" }}/>
            <span>Location</span>
          </div>
          <div>
            <AiOutlineSchedule style={{ color: "orangered", fontSize: "20px" }}/>
            <span>Shedule</span>
          </div>
          </div>
          <button className="button ps-button" 
          type='submit'>
            Share
          </button>

          <div style={{ display: "none" }}>
            <input
              type="file"
              //name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>

          


      </form>
      {image && (

            <div className="previewImage">
              <FaRegTimesCircle onClick={()=>setImage(null)}/>
              <img src={URL.createObjectURL(image)}  alt="" />
            </div>

           )}

    </div>
  )
}
