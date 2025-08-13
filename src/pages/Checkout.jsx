import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Checkout({cart, clearCart}){
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [offer, setOffer] = useState('')
  const navigate = useNavigate()
  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0)
  const discounted = offer === 'FIRST10' ? Math.round(total * 0.9) : total
  function placeOrder(e){ e.preventDefault(); clearCart && clearCart(); navigate('/order-success') }
  return (
    <div>
      <h2 style={{marginTop:12}}>Checkout</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:12,marginTop:8}}>
        <form className="checkout-form" onSubmit={placeOrder}>
          <div style={{marginBottom:8}}><label>Name</label><input required value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',padding:8}} /></div>
          <div style={{marginBottom:8}}><label>Address</label><textarea required value={address} onChange={e=>setAddress(e.target.value)} style={{width:'100%',padding:8}} /></div>
          <div style={{marginBottom:8}}><label>Offer code</label><input value={offer} onChange={e=>setOffer(e.target.value)} style={{width:'100%',padding:8}} placeholder="Enter FIRST10 for 10% off" /></div>
          <div style={{marginTop:12}}><button className="btn" type="submit">Place Order</button></div>
        </form>

        <div style={{position:'relative'}}>
          <div style={{background:'#fff',padding:12,borderRadius:8}}>
            <h4>Order Summary</h4>
            <div>Items: {cart.length}</div>
            <div>Total: ₹{total}</div>
            {offer==='ABHI20' && <div style={{color:'#059669'}}>Offer applied: 20% off → ₹{discounted}</div>}
            <div style={{marginTop:8}} className="offer-box">🎉 Offer: Use code <strong>ABHI20</strong> to get 20% off</div>
          </div>
        </div>
      </div>
    </div>
  )
}
