import React from 'react'
import { Link } from 'react-router-dom'
export default function OrderSuccess(){
  return (
    <div style={{textAlign:'center',padding:40}}>
      <h2>✅ Order placed successfully!</h2>
      <p>Your order will arrive shortly.</p>
      <Link to="/"><button className="btn">Back to Home</button></Link>
    </div>
  )
}
