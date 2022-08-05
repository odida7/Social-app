import React from 'react'
import './feed.css'
import Share from '../share/Share'
import Posts from '../posts/Posts'

export default function HomeFd() {
  return (
    <div className='feed'>
      
      <Share/>
      <Posts/>
    </div>
  )
}
