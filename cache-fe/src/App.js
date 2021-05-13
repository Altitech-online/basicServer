import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState();
  
  const onSubmit = async () => {
    setLoading(true);
    try{
      const data = {
        body: {
          name,
          age
      }
      }
      const result = await fetch('http://localhost:8090/chache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
       body: JSON.stringify(data) 
      });
      console.log(result);
      setData(result.toString());
    } catch(e) {
      console.log(e)
    }
    setLoading(false);
  }

  const isEnabled = age.length > 0 && name.length > 0

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {data && <h1>{data}</h1>}
        {!loading &&
          <div>
            Name: <input onChange={(e) => setName(e.target.value)}/>
            Age: <input onChange={(e) => setAge(e.target.value)}/>
            <button disabled={!isEnabled} onClick={() => onSubmit()}>Fetch quote</button>
          </div>
        }
      </header>
    </div>
  );
}

export default App;
