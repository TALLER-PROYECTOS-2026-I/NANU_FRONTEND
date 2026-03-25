import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

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

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "12px 28px",
          fontSize: "16px",
          fontWeight: 600,
          color: "#fff",
          background: "#3b82f6",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "24px",
        }}
      >
        Ir al Dashboard
      </button>

      <h2>Respuesta del backend:</h2>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default Home;