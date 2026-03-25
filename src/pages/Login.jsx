import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 🔥 llamada a tu API
      const res = await fetch(
        "https://ujp4asesoj.execute-api.us-east-2.amazonaws.com/Prod/items"
      );

      const users = await res.json();

      // 🔍 validar usuario
      const userFound = users.find(
        (u) =>
          u.email === form.email && u.password === form.password
      );

      if (!userFound) {
        setError("Credenciales incorrectas ❌");
        return;
      }

      // ✅ login correcto
      localStorage.setItem("user", JSON.stringify(userFound));

      // 🚀 redirección
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>NANU TECH</h1>
        <p className="subtitle">Sistema de Gestión de Flota</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={handleChange}
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">Iniciar Sesión</button>
        </form>

        {/* 🔴 error */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <a href="#" className="forgot">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  );
}