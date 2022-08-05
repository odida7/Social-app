import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './profiletop.css'
//import ProfileModel from '../profilemodel/ProfileModel'

export default function Profiletop() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext)

 useEffect(()=>{
    const fetchPosts = async () => {
    const res = await axios.get("/posts/profile/" + user._id)
    setPosts(res.data)
    } 
    fetchPosts();
  }, [user._id])
   


  return (
    <div className='profiletop'>
      <div className="wrapper">
        <div className="picture">
         
          <img src={user.coverPicture || PF+'cover.jpg'} alt='' className='coverpic'/>
        
          <img src={user.profilePicture || PF+'noAvatar.png'} alt='' className='profilepic'/>
          <button className='button ed-button'>
            Edit-profile
          </button>
        {/* <ProfileModel/> */}
        </div>
 
        <div className="info">
          
          <h2>@{user.firstname} {user.lastname}</h2>
          
          <div className="batons">
            <div className='folo'>
              <button className='button fc-button'>
                Following
              </button>
              <span>{user.followings.length}</span>
            </div>
     
            <div className='folo'>
              <button className='button fc-button'>
                Followers
              </button>
              <span>{user.followers.length}</span>
            </div>
    
            <div className='folo'>
              <button className='button fc-button'>
                Posts
              </button>
              <span>
                {posts.filter((post)=>post.userId === user._id).length}
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
