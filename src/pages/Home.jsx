import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState(null);

useEffect(() => {
  fetch("https://ujp4asesoj.execute-api.us-east-2.amazonaws.com/Prod/items")
    .then(res => res.json())
    .then(data => {
      console.log("DATA:", data);
      setData(data);
    })
    .catch(err => console.error(err));
}, []);

  return (
    <div>
      <h1>NANUTECH 🚀</h1>

      <h2>Respuesta del backend:</h2>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default Home;