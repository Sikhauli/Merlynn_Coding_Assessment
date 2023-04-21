import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Home() {

  const [items, setItems] = useState([]);
  const [name, setName] = useState();


  useEffect(() => {
 
    axios.get('http://localhost:5000/models')
    .then(response => {
      const itemsArray = Object.entries(response);
        console.log("NAME: " + JSON.stringify(itemsArray[0][1].data.attributes.name))
      setName( JSON.stringify(itemsArray[0][1].data.attributes.name ))
      setItems(JSON.stringify(itemsArray[0][1].data.attributes.metadata.prediction.domain.values));
      console.log("NAME: " + JSON.stringify(itemsArray[0][1].data.attributes.metadata.prediction.domain.values))

    })
    .catch(error => {
      console.log(error);
    });
 
}, []);


  return (
    <div>

    <ul>
    <li>
    {name}     
    </li>
    </ul>
        
    </div>
  )
}

export default Home