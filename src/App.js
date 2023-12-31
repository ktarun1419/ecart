import logo from "./assets/logo.gif";
import "./App.css";
import Razorpay from "razorpay";
import { useEffect, useState } from "react";
import Checkout from "./Checkout";

function App() {
  const [isConnected, setisConnected] = useState(false);
  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["battery_service"], // Replace with your service
      });

      const server = await device.gatt.connect();
      console.log({ server });
      const service = await server.getPrimaryService("battery_service"); // Replace with your service
      const characteristic = await service.getCharacteristic("battery_level"); // Replace with your characteristic
      console.log({ service });
      characteristic.readValue().then((value) => {
        // console.log('Battery percentage is ' + value.getUint8(0));
        alert("Battery percentage is " + value.getUint8(0));
        setisConnected(true);
      });
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };
  const handleCharacteristicValueChanged = (event) => {
    const value = new TextDecoder().decode(event.target.value);
    console.log("RFID Tag:", value);
    // Process RFID tag value here
  };

  // Usage
  const sendPayment = () => {
    var instance = new Razorpay({
      key_id: "rzp_test_twjx5q9HrIUeGo",
      key_secret: "YO22rZUVVn3xAQVZXOEQ1Wrd",
    });
    console.log({ instance });
    // instance.orders.create({
    //   "amount": 100,
    //   "currency": "INR",
    //   "customer_id": "cust_4xbQrmEoA5WJ01",
    //   "method": "upi",
    //   "token": {
    //     "max_amount": 200000,
    //     "expire_at": 2709971120,
    //     "frequency": "monthly"
    //   },
    //   "receipt": "Receipt No. 1",
    //   "notes": {
    //     "notes_key_1": "Tea, Earl Grey, Hot",
    //     "notes_key_2": "Tea, Earl Grey… decaf."
    //   }
    // })
    instance.payments
      .all({
        from: "2016-08-01",
        to: "2016-08-20",
      })
      .then((response) => {
        // handle success
      })
      .catch((error) => {
        // handle error
      });
  };
  
  // const payNow=()=>{
  //  let form= document.createElement('form')
  //  let script=document.createElement('script')
  //  script.scr='https://checkout.razorpay.com/v1/payment-button.js'
  //  script['data-payment_button_id'] = 'pl_NAwy7E4AHIjSzo'
  //  script.async=true

  //   form.appendChild(script)

  //   form.click()

  // }
  return (
    <div className="App">
      {!isConnected ? (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Smart , Reliable and Fast.</p>
          <button className="connect" onClick={connectBluetooth}>
            Connect
          </button>

          <button>
         
          </button>
        </header>
      ) : (
        <Checkout />
      )}
    </div>
  );
}

export default App;
