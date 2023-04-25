import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore"



function DrinkChoiceForm() {

  const [model, setModel] = useState(null);
  const [apiDecision, setApiDecison] = useState(null);
  const [value, setValue] = React.useState("");

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
      
      axios.post('https://api.up2tom.com/v3/decision/58d3bcf97c6b1644db73ad12', JSON.stringify(requestData)
      , {
      headers: {
        'Authorization': 'TOKEN 9307bfd5fa011428ff198bb37547f979',
        'Content-Type': 'application/vnd.api+json'
      },
    }).then(data => {
      
      const collectionRef = collection(db, "drinks");
      const profile = {
        INPUTVAR1: data.data.data.attributes.input.INPUTVAR1,
        INPUTVAR2: data.data.data.attributes.input.INPUTVAR2,
        INPUTVAR3: data.data.data.attributes.input.INPUTVAR3,
        INPUTVAR4: data.data.data.attributes.input.INPUTVAR4,
        INPUTVAR5: data.data.data.attributes.input.INPUTVAR5,
        INPUTVAR6: data.data.data.attributes.input.INPUTVAR6,
        INPUTVAR7: data.data.data.attributes.input.INPUTVAR7,
        INPUTVAR8: data.data.data.attributes.input.INPUTVAR8,
        INPUTVAR9: data.data.data.attributes.input.INPUTVAR9,
        decision: data.data.data.attributes.decision,
        model: data.data.data.attributes.model,
        confidence: data.data.data.attributes.confidence,
        id: data.data.data.id,
        type: data.data.data.type
      };

      addDoc(collectionRef, profile).then(() => {
        alert("Saved successfully");
        console.log("saved successfully")
      }).catch((err) => {
        console.log(err);
      })

      console.log(data)
     setApiDecison(data.data.data.attributes.decision)
    }
     ).catch(error => {
            console.log(error);
          });
   }
    console.log(apiDecision)

  if (!model) return <div className="bg-center hover:bg-top text-3xl font-bold ">Model Is Empty, Loading The Model...</div>;

  return (

    <div class="bg-cyan-300 h-full flex flex-col items-center justify-center">
  <form id='drinkChoiceForm' class='bg-white w-full md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-lg shadow-lg p-6'>
    <h1 class="text-3xl font-bold mb-4 text-center">{model.name}</h1>
    {model.inputs.map(input => (
      <div class="mb-4" key={input.name}>
        <label class="block font-medium mb-2">{input.question}</label>
        {input.type === 'Nominal' ? (
          <select class="block w-full rounded-md shadow-sm py-2 px-3 border border-gray-300" name={input.name}>
            {input.domain.values.map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        ) : (
          <input class="block w-full rounded-md shadow-sm py-2 px-3 border border-gray-300" type="number" name={input.name} step={input.domain.interval} min={input.domain.lower} max={input.domain.upper} />
        )}
      </div>
    ))}
    <button class="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md w-full mb-4" onClick={makeDecision} type="submit">Submit</button>
  </form>

  <div class="bg-indigo-500 text-white rounded-md py-2 px-4 mt-4">
    <p class="text-center">{apiDecision}</p>
  </div>
</div>

  );
}

export default DrinkChoiceForm;


