import React from 'react'
export default function Home({products, addToCart}){
  return (
    <div>
      <div className="banner">
        <div>
          <h2 style={{fontSize:24, fontWeight:700}}>Delivery in 20 minutes</h2>
          <div>Fresh groceries delivered fast</div>
        </div>
        <img src="/images/banner.png" alt="banner" style={{height:80,borderRadius:10}}/>
      </div>

      <h3 style={{marginTop:12}}>Popular items</h3>
      <div className="grid">
        {products.slice(0,8).map(p=> (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.title} />
            <div className="title">{p.title}</div>
            <div className="meta"><div>₹{p.price}</div><div><button className="btn" onClick={()=> addToCart && addToCart(p)}>Add</button></div></div>
          </div>
        ))}
      </div>
    </div>
  )
}
