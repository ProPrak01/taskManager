import React from 'react'
import './card.css'
const Card = ({text, time}) => {
  return (
        <div className="card">
            <h4 style={{textAlign:"center"}}>{text}</h4>
            <div className="timeShow"><p>{time}</p></div>
        </div>
  )
}

export default Card