import React, { useContext, useRef, useState } from 'react'
import './profilemodel.css'
import { FaRegTimesCircle } from "react-icons/fa";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';


export default function ProfileModel() {
  //const { password, ...other } = data;
  const [formData, setFormData] = useState([]);
  //const [profileImage, setProfileImage] = useState(null);
  //const [coverImage, setCoverImage] = useState(null);
  const {user} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);

      /*event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);*/
    }
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = user.formData;
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      UserData.image = fileName;
      try{
         await axios.post('/upload', data)
      }catch(error){
        console.log(error)
      }
    }
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      UserData.image = fileName;
      try{
         await axios.post('/upload', data)
      }catch(error){
        console.log(error)
      }
    }

    
        await axios.put(`/users/${user._id}`, UserData)
      
  };


  return (
    <div className='wrupper'>
      <form className='infom' onClick={handleSubmit}>
        <FaRegTimesCircle className='close'/>
        
        <div className='name'>
            <h3>First name</h3>
            <input type='text' 
            value={formData.firstname}
            onChange={handleChange}
            placeholder='Firstname' 
            name='firstname' 
            className='proinput'
            />

            <h3>Last name</h3>
            <input type='text' 
            value={formData.lastname}
            onChange={handleChange}
            placeholder='Lastname' 
            name='lastname' 
            className='proinput'
            />
        </div>

        <div className='pic'>
          <h3>CoverPicture</h3>
          <input type='file' 
            //name='coverImage'
            ref={imageRef}
            onChange={onImageChange}
          />
        </div>

        <div className='pic'>
          <h3>ProfilePicture</h3>
          <input type='file' 
            //name='profileImage'
            ref={imageRef}
            onChange={onImageChange}
          />
        </div>
         <button className='button up-button' type='submit'>
            Update
          </button>
      </form>
    </div>
  )
}
