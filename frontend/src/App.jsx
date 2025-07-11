import { useState } from 'react'

import './App.css'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
 
  async function getData(){
  const response =await  fetch('http://localhost:8080')
  const data =await response.json()
  console.log(data)
  }
  }, [])
 

  return (
    <>
    Hello(fronrend )
    </>
  )
}

export default App
