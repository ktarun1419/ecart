import React, { useEffect, useState } from 'react'
import './Checkout.css'
const Checkout = () => {
    const [items,setItems]=useState([])
    useEffect(() => {
        const rzpPaymentForm = document.getElementById("rzp_payment_form");
    
        if (!rzpPaymentForm.hasChildNodes()) {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/payment-button.js";
          script.async = true;
          script.dataset.payment_button_id = "pl_NAwy7E4AHIjSzo";
          rzpPaymentForm.appendChild(script);
        }
      });
      useEffect(()=>{
        setTimeout(()=>{
            setItems([...items,{name:'Maggi',price:'200.00'}])
        },10000)
      },[])
  return (
    <div className='checkout'>
        <div className='checkout_header'>
            Checkout and Pay
        </div>
        <div className='checkout_body'>
            {items.map((item)=>(<div className='each_item'>
                <div>
                   {item?.name}
                </div>
                <div>
                   {item?.price}
                </div>
                {/* <div>
                    E&
                </div> */}
            </div>))}
            
        </div>
        <div className='checkout_footer'>
        <form id="rzp_payment_form"></form>
        </div>
    </div>
  )
}

export default Checkout