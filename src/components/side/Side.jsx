import React, { useContext } from 'react'
import './side.css'
import {ImHome} from 'react-icons/im';
import {CgProfile} from 'react-icons/cg';
import {FaUserFriends} from 'react-icons/fa';
import {HiUserGroup} from 'react-icons/hi';
import {FcShop} from 'react-icons/fc';
import {BsCollectionPlayFill} from 'react-icons/bs';
import {MdOutlineWatchLater} from 'react-icons/md';
import {BsSave2Fill} from 'react-icons/bs';
import {BsFillFlagFill} from 'react-icons/bs';
import {BsCalendarEventFill} from 'react-icons/bs';
import {AiOutlineFieldTime} from 'react-icons/ai';
import {BsBookmarkStarFill} from 'react-icons/bs';
import {GiGraduateCap} from 'react-icons/gi';
import {BsFillBriefcaseFill} from 'react-icons/bs';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
//import { logout } from '../../context/AuthActions';

export default function Side() {
  const {user, dispatch} = useContext(AuthContext)
  
  const handleLogOut = ()=> {
    dispatch({type: "LOG_OUT", user: null})
  }
 
  return (
    <div className='side'>
      <div className="sidebarwrapper">
        <ul className="sidebarlist">
           <li className="sidebaritem">
            <Link to={'/'}>
            <ImHome className="sidebaricon" />
            <span className="sidetext">Home</span>
            </Link>
           </li>

            <li className="sidebaritem">
              <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", alignItems: "center" }}>
                <CgProfile className="sidebaricon" />
                <span className="sidetext">Profile</span>
              </Link>

           </li>

            <li className="sidebaritem">
            <FaUserFriends className="sidebaricon" />
            <span className="sidetext">Friends</span>
           </li>

           <li className="sidebaritem">
            <HiUserGroup className="sidebaricon" />
            <span className="sidetext">Groups</span>
           </li>
           
           <li className="sidebaritem">
            <FcShop className="sidebaricon" />
            <span className="sidetext">Marketplace</span>
           </li>
           
           <li className="sidebaritem">
            <BsCollectionPlayFill className="sidebaricon" />
            <span className="sidetext">Watch</span>
           </li>
           
           <li className="sidebaritem">
            <MdOutlineWatchLater className="sidebaricon" />
            <span className="sidetext">Memories</span>
           </li>
           
           <li className="sidebaritem">
            <BsSave2Fill className="sidebaricon" />
            <span className="sidetext">Saved</span>
           </li>
           
           <li className="sidebaritem">
            <BsFillFlagFill className="sidebaricon" />
            <span className="sidetext">Pages</span>
           </li>
           
           <li className="sidebaritem">
            <BsCalendarEventFill className="sidebaricon" />
            <span className="sidetext">Events</span>
           </li>
           
           <li className="sidebaritem">
            <AiOutlineFieldTime className="sidebaricon" />
            <span className="sidetext">Recent</span>
           </li>
           
           <li className="sidebaritem">
            <BsBookmarkStarFill className="sidebaricon" />
            <span className="sidetext">Favourite</span>
           </li>
           
           <li className="sidebaritem">
            <GiGraduateCap className="sidebaricon" />
            <span className="sidetext">Courses</span>
           </li>

           <li className="sidebaritem">
            <BsFillBriefcaseFill className="sidebaricon" />
            <span className="sidetext">Jobs</span>
           </li>
        </ul>

        <button className="button sidebarButton" onClick={handleLogOut}>
          LogOut
        </button>
      </div>

    </div>
  )
}
