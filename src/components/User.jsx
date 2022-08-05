import React, { useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function User({person}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user, dispatch} = useContext(AuthContext)
  const [followed, setFollowed] = useState(
    person.followers.includes(user._id)
  );


  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${person._id}/unfollow`, user);
        dispatch({ type: "UNFOLLOW", payload: user._id });
        window.location.reload();
      } else {
        await axios.put(`/users/${person._id}/follow`, user);
        dispatch({ type: "FOLLOW", payload: user._id });
        window.location.reload();
      }
       setFollowed((prev) => !prev);
    } catch (error) {
    console.log(error)
    }
  };



  return (
    <div className="follow">
      
            <div className="follower">
              <div className='fln'>
          <Link to={`/profile/${user._id}`}>
              <img src={person.profilePicture ? PF + person.profilePicture : PF + 'noAvatar.png'}  alt='' className='followimg'/>
          </Link>

              <div className="followName">
                <span>{person.firstname} {person.lastname}</span>
              </div>
              </div>
              <button className={
               followed ? "button fl-button UnfollowButton" : "button fl-button"}
               onClick={handleFollow}
               >
                {followed ? "Unfollow" : "Follow"}
              </button>
            </div>
      </div>
  )
}
