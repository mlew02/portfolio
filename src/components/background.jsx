import React, { useState, useEffect } from 'react'
import Snowfall from 'react-snowfall'

const Background = () => {
  const [snowflakeCount, setSnowflakeCount] = useState(25)

  const updateSnowflakeCount = () => {
    const width = window.innerWidth
    if (width >= 1920) {
      setSnowflakeCount(150) // Desktop size
    } else if (width >= 768) {
      setSnowflakeCount(100) // Tablet size
    } else {
      setSnowflakeCount(25) // Mobile size
    }
  }

  useEffect(() => {
    updateSnowflakeCount() // Set initial count
    window.addEventListener('resize', updateSnowflakeCount) // Update count on resize

    return () => {
      window.removeEventListener('resize', updateSnowflakeCount)
    }
  }, [])

  return (
    <div>
      <Snowfall
        color="#fff"
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          background: '#133A53',
          zIndex: -1
        }}
        snowflakeCount={snowflakeCount}
        speed={[0.5, 1.0]}
        wind={[-1.0, 3.0]}
      />
    </div>
  )
}

export default Background