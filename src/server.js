
const express = require('express');
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express();
const port = 5000;


app.get('/', (req, res) => {
//   res.send('Hello World!');
    res.json('Hello World!');
});

app.get('/models', (req, res) => {
    
        const options = {
            method: 'GET',
            url : 'https://api.up2tom.com/v3/models',
            headers: {
                'Authorization':process.env.UP_2_TOM_API_KEY,
                'Content-Type':'application/vnd.api+json'
            }
        }
            axios.request(options).then((response) =>{
                res.json(response.data)

            }).catch((error) => {
                console.error(error)
            })
    });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
