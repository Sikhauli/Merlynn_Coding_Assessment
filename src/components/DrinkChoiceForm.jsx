import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Home() {

  const [drinksItems, setItems] = useState([]);
  const [drinkName, setName] = useState();

  useEffect(() => {
 
    axios.get('http://localhost:5000/models')
    .then(response => {
      const itemsArray = Object.entries(response);
      setName(itemsArray[0][1].data.attributes.name)
      setItems(itemsArray[0][1].data.attributes.metadata.prediction.domain.values);
    })
    .catch(error => {
      console.log(error);
    });
 
}, []);
  return (
    <div>
        <p>Name: {drinkName}</p>
    
        <ul>
            {drinksItems.map(item => (
              <li>{item}</li>
            ))}
        </ul>
    </div>
  )
}

export default Home