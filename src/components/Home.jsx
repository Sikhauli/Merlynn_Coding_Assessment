import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DrinkChoiceForm() {

  const [model, setModel] = useState(null);
  const [apiDecision, setApiDecison] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/models')
      .then(response => {
        const metadata = response.data.data.attributes.metadata;
        const name = response.data.data.attributes.name;
        const inputs = metadata.attributes;

        setModel({ name, inputs });
      })
      .catch(error => console.log(error));
  }, []);

  function makeDecision(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('drinkChoiceForm'));
    const jsonData = Object.fromEntries(formData.entries());

      const requestData = {
        "data" : {
          "type": "scenario",
          "attributes": {
            "input": jsonData
          }
        }
      };

      console.log(JSON.stringify(requestData))
      
      axios.post('https://api.up2tom.com/v3/decision/58d3bcf97c6b1644db73ad12', JSON.stringify(requestData), {
      // method: 'POST',
      headers: {
        'Authorization': 'TOKEN 9307bfd5fa011428ff198bb37547f979',
        'Content-Type': 'application/vnd.api+json'
      },
      data: JSON.stringify(Object.fromEntries(formData)),
    })
    .then(data => {

     setApiDecison(data.data.data.attributes.decision)

    }
     ).catch(error => {
            console.log(error);
          });
  }

    console.log(apiDecision)

  if (!model) return <div>Model Is Empty, Loading The Model...</div>;

  return (
    <form id='drinkChoiceForm'>
      <h1>{model.name}</h1>
      {model.inputs.map(input => (
        <div key={input.name}>
          <label>{input.question}</label>
          {input.type === 'Nominal' ? (
            <select name={input.name}>
              {input.domain.values.map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          ) : (
            <input type="number" name={input.name} step={input.domain.interval} min={input.domain.lower} max={input.domain.upper} />
          )}
        </div>
      ))}
      <button onClick={makeDecision} type="submit">Submit</button>
    </form>
  );
}

export default DrinkChoiceForm;
