import React from 'react'
import Side from '../../components/side/Side'
import Right from '../../components/right/Right'
import './home.css'
import HomeFd from '../../components/feed/HomeFd'

export default function Home() {
  return (
    <div className='home'>
      <Side/>
      <HomeFd/>
      <Right/>
    </div>
  )
}
