import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';

// CSS
import './styles/common.css';

// Components
import { HeaderLayout, BodyLayout } from './components/layout';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    // Fetch items from the backend
    axios.get('http://localhost:5000/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });
  }, []);

  const addItem = () => {
    axios.post('http://localhost:5000/api/items', { name: newItem })
      .then(response => {
        setItems([...items, response.data]);
        setNewItem('');
      })
      .catch(error => {
        console.error('There was an error adding the item!', error);
      });
  };

  return (
    <BrowserRouter>
      <HeaderLayout />

      <BodyLayout />

      <div className='app-footer'>
        <ul className='footer-link'>
          <li><Link to="/test1">Feedback</Link></li>
          <li><Link to="/test2">Contact</Link></li>
        </ul>

        <p>© 2024 ShowBok's. All rights reserved.</p>
      </div>

      <div>
        <h2>Items</h2>
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </BrowserRouter>
  );
}

export default App;