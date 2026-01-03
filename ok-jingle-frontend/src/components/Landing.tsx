import React, { useState } from 'react'

const Landing = () => {
    const [name, setName ] = useState("");
  return (
    <div>
      <input type="text" onChange={(e) => {
        setName(e.target.value)
      }} />
      <button onClick={() => {
        // Navigate to room page with name
      }}>Enter Room</button>
    </div>
  )
}

export default Landing
