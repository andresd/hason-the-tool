import React, { useEffect } from 'react'
import dotenv from 'dotenv'

import '../../assets/main.css'
import { MainArea } from './MainArea'
import { ga } from '../../shared'

dotenv.config()

const App = () => {
  useEffect(() => {
    ga.pageView('/')
  }, [])

  return (
    <div className='h-screen'>
      <MainArea />
    </div>
  )
}

export default App
