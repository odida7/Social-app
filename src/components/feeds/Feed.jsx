import React from 'react'
import './feed.css'
import Share from '../share/Share'
import Posts from '../posts/Posts'
import Profiletop from '../../components/profiletop/Profiletop'

export default function Feed() {

 

  return (
    <div className='feed'>
      <Profiletop/>
      <Share/>
      <Posts/>
    </div>
)};