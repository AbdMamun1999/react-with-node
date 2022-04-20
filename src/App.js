import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])


  const handleAddUser = event => {
    event.preventDefault()
    const email = event.target.email.value;
    const name = event.target.name.value;
    const user = {name,email}

    // post to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res=> res.json())
    .then(data => {
      const newUsers = [...users, data]
      setUsers(newUsers)
    })
  }


  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <input type="email" name="email" id="" />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        <h1>Load data from Node server:{users.length}</h1>
        {
          users.map(user => <li key={user.id}>{user.name}:{user.id}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
