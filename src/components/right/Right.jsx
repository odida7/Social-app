import React, { useContext } from 'react'
import './right.css'
import Search from '../search/Search'
import { AuthContext } from '../../context/AuthContext';
import User from '../User';
import { useEffect, useState } from 'react';
import axios from 'axios'


export default function Right() {
  const {user} = useContext(AuthContext)
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const {data} = await axios.get("/users");
        setPersons(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, []);

  return (
    <div className='right'>
      <Search/>
        <h3>Friends</h3>
      
       {persons.map ((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
       })}

    
    </div>
  )
}
