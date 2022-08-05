import React from 'react'
import {BsSearch} from 'react-icons/bs';
import './search.css'

export default function Search() {
  return (
    <div>
      <div className="search">
        <BsSearch className='searchicon'/>
        <input type='text' placeholder='Search for friends and more' className='searchtext' />
      </div>

    </div>
  )
}
