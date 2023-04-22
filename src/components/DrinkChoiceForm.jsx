import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

  const [file, setFile] = useState([]);

  const [drinksItems, setItems] = useState([]);
  const [drinkName, setName] = useState('');
  
  const [drinkTemp, setTemp] = useState(0);
  const [gender, setGender] = useState([]);
  const [age, setAge] = useState(18);
  const [sensitiveCaffeine, setSensitiveCaffeine] = useState([]);
  const [timeOfDay, setTimeOfDay] = useState([]);
  const [pregnant, setPregnant] = useState([]);
  const [healthConcious, setHealthConcious] = useState([]);
  const [numberDrinkConsumedToday, setNumberDrinkConsumedToday] = useState(0);
  const [numberDrinkConsumedPerDay, setNumberDrinkConsumedPerDay] = useState(0);

  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
 
    axios.get('http://localhost:5000/models')
    .then(response => {
      const itemsArray = Object.entries(response);
      setFile(itemsArray[0][1])
      setName(itemsArray[0][1].data.attributes.name)
      setItems(itemsArray[0][1].data.attributes.metadata.prediction.domain.values);
      setAttributes(itemsArray[0][1].data.attributes.metadata.attributes);
      
    })
    .catch(error => {
      console.log(error);
    });
 
}, []);

console.log(attributes)

  return (

    <div>
      {attributes.map((attribute, index) => (
        <div key={index}>
          <h2>{attribute.name}</h2>
          <p>{attribute.question}</p>
          {attribute.domain.type === 'DomainR' && (
            <p>
              Continuous domain from {attribute.domain.lower} to{' '}
              {attribute.domain.upper}, with interval {attribute.domain.interval}
            </p>
          )}
          {attribute.domain.type === 'DomainC' && (
            <p>
              Nominal domain with values: {attribute.domain.values.join(', ')}
            </p>
          )}
        </div>
      ))}
    </div>


    )}

export default Home