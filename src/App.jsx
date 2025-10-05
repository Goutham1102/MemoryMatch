import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MemoryGame from './pages/MemoryGame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MemoryGame/>
    </>
  )
}

export default App
