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
      // 🔥 LOGIN REAL
      const res = await fetch(
        "https://ujp4asesoj.execute-api.us-east-2.amazonaws.com/Prod/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      // 🔍 validación backend
      if (!res.ok) {
        setError(data.message || "Credenciales incorrectas ❌");
        return;
      }

      // ✅ guardar sesión (token o usuario)
      localStorage.setItem("user", JSON.stringify(data));

      // 🚀 redirección
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <a href="#" className="forgot">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  );
}