import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Post from '../post/Post'
import './posts.css'
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
//import Profile from '../../pages/profile/Profile'

export default function Posts({userId}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(()=>{
    const fetchPosts = async () => {
    const res = userId 
    ? await axios.get("/posts/profile/" + userId)
    : await axios.get("/posts/timeline/" + user._id);
    setPosts(res.data)
    } 
    fetchPosts();
  },[userId, user._id])
   

  return (
    <div className='posts'>
      {posts.map((p)=>(
        <Post key={p._id} post={p}/>
      ))}
    </div>
  )
}
