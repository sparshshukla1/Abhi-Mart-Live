import React from 'react'
import { Link } from 'react-router-dom'
export default function CartPage({cart, updateQty, removeItem}){
  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0)
  return (
    <div>
      <h2 style={{marginTop:12}}>Your Cart</h2>
      {cart.length===0 ? <div>Your cart is empty. <Link to="/">Shop now</Link></div> : (
        <div>
          {cart.map(it=> (
            <div key={it.id} style={{display:'flex',gap:12,alignItems:'center',padding:8,background:'#fff',borderRadius:8,marginTop:8}}>
              <img src={it.image} alt={it.title} style={{width:80,height:80,objectFit:'cover'}}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:600}}>{it.title}</div>
                <div>₹{it.price} · {it.qty} pcs</div>
                <div style={{marginTop:8}}>
                  <button onClick={()=> updateQty && updateQty(it.id, Math.max(1,it.qty-1))}>-</button>
                  <span style={{padding:'0 8px'}}>{it.qty}</span>
                  <button onClick={()=> updateQty && updateQty(it.id, it.qty+1)}>+</button>
                  <button style={{marginLeft:12,color:'#e11'}} onClick={()=> removeItem && removeItem(it.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div style={{marginTop:12,fontWeight:700}}>Total: ₹{total}</div>
          <div style={{marginTop:12}}><Link to="/checkout"><button className="btn">Proceed to Checkout</button></Link></div>
        </div>
      )}
    </div>
  )
}
