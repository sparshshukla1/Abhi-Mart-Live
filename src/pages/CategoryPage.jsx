import React from 'react'
import { useParams } from 'react-router-dom'
export default function CategoryPage({products, addToCart}){
  const { slug } = useParams()
  const list = products.filter(p => p.category === slug)
  return (
    <div>
      <h2 style={{marginTop:12,textTransform:'capitalize'}}>{slug}</h2>
      <div className="grid">
        {list.map(p=> (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.title} />
            <div className="title">{p.title}</div>
            <div className="meta"><div>₹{p.price}</div><div><button className="btn" onClick={()=> addToCart && addToCart(p)}>Add</button></div></div>
          </div>
        ))}
      </div>
    </div>
  )
}
