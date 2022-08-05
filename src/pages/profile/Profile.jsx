import React from 'react'
import Side from '../../components/side/Side'
import Feed from '../../components/feeds/Feed'
import Right from '../../components/right/Right'
import './profile.css'



export default function Profile() {
  return (
    <div className='profile'>
      <Side/>
      <Feed/>
      <Right/>
    </div>
  )
}
