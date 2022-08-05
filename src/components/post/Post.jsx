import React, { useEffect } from 'react'
import './post.css'
import { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
//import * as timeago from 'timeago.js';
//import { format } from "timeago.js";


export default function Post({post}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext);

  useEffect(()=>{
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);
    
  const likeHandler = async()=>{
    try{
       await axios.put('/posts/'+ post._id + '/like', {userId: currentUser._id})
    }catch(error){
       console.log(error)
    } 
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }
  
   useEffect(()=>{
    const fetchUser = async () => {
    const res = await axios.get(`/users/${post.userId}`);
    setUser(res.data)
  
    }
    fetchUser();
  },[post.userId]);

 
  return (
    <div className='post'>
        <div className='postop'>
          <Link to={`/profile/${user._id}`}>

            <img src={user.profilePicture ? PF + user.profilePicture : PF+'noAvatar.png'} alt='' className='profileimg'/>

          </Link>
          <span>{user.firstname} {user.lastname}</span>
         {/* <span className="postDate">{format(post.createdAt)}</span> */}
        </div>

        <div className='postcenter'>
            <span className='desc'>{post.desc}</span>
            <img src={post.image ? PF + post.image : ''} alt='' className='profilepost'/>
          
        </div>

        <div className='postbottom'>
          <div className='botom'>  
          <img 
          src={PF + 'lk.png'} 
          alt='' 
          className='svg' 
           onClick={likeHandler}
           />
           
          <span>{like}</span>
          </div>

          <div className='botom'>
          <img src={PF + 'cm.png'} alt='' className='svg'/>
          <span>{post.comment}</span>
          </div>
    
          <div className='botom'>
          <img src={PF + 'sh.png'} alt='' className='svg'/>
          </div>
          
        </div>
         
    </div>
  )
}
