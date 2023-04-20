import React from 'react';
import { useState, useEffect } from 'react';



function Home() {

  const [items, setItems] = useState([]);


//   useEffect(() => {
//   axios.get('https://api.up2tom.com/v3/9307bfd5fa011428ff198bb37547f979')
//     .then(response => {
//         setItems(response.data);
//     })
//     .catch(error => {
//       console.error(error);
//     });



// }, []);

console.log(items);


  return (
    <div>
    
   <list>
   <ul>Home</ul>
   </list>
    </div>
  )
}

export default Home