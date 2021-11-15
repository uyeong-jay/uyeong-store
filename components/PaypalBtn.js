import React, { useEffect, useRef } from "react";

const PaypalBtn = ({ totalPrice, address, mobile, state, dispatch }) => {
  const refPayPalBtn = useRef();
  const { cart, auth } = state;

  useEffect(() => {
    paypal.Buttons({

      createOrder: function(data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: totalPrice
            }
          }]
        });
      },

      onApprove: function(data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {
          // This function shows a transaction success message to your buyer.
          console.log(data);
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      }
      
    }).render(refPayPalBtn.current);
    //This function displays Smart Payment Buttons on your web page.
  }, [])


  return (
    <div ref={refPayPalBtn}></div>
  );
};

export default PaypalBtn;