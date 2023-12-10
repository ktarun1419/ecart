import logo from './logo.svg';
import './App.css';

function App() {
  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'] // Replace with your service
      });
  
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('battery_service'); // Replace with your service
      const characteristic = await service.getCharacteristic('battery_level'); // Replace with your characteristic
  
      characteristic.readValue().then(value => {
        console.log('Battery percentage is ' + value.getUint8(0));
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Usage
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={connectBluetooth}>Connect</button>
      </header>
    </div>
  );
}

export default App;
