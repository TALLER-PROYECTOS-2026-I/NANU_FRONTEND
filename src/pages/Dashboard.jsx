import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getCamiones } from "../api/api";
import "./Dashboard.css";

const kmData = [
  { name: "Camión 1", km: 210 },
  { name: "Camión 2", km: 195 },
  { name: "Camión 3", km: 240 },
  { name: "Camión 4", km: 185 },
  { name: "Camión 5", km: 200 },
];

const productividadData = [
  { name: "Conductor A", horas: 8 },
  { name: "Conductor B", horas: 7.5 },
  { name: "Conductor C", horas: 7 },
  { name: "Conductor D", horas: 7 },
  { name: "Conductor E", horas: 8.5 },
];

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: "📊" },
  { label: "DayRecord", path: "/dayrecord", icon: "📋" },
  { label: "Camiones", path: "/dashboard", icon: "🚛" },
  { label: "Contratos", path: "/dashboard", icon: "📄" },
  { label: "GPS", path: "/dashboard", icon: "📍" },
];

function Dashboard() {
  const navigate = useNavigate();
  const [camiones, setCamiones] = useState([]);

  useEffect(() => {
    getCamiones()
      .then((res) => setCamiones(res.data || []))
      .catch((err) => console.error("Error cargando camiones:", err));
  }, []);

  const camionesActivos = camiones.filter((c) => c.estado === "activo");

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">NANU TECH</h2>
          <span className="sidebar-subtitle">Gestión de Flota</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${item.label === "Dashboard" ? "active" : ""}`
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          🚪 Cerrar Sesión
        </button>
      </aside>

      {/* Main content */}
      <main className="dashboard-main">
        <h1 className="dashboard-title">Dashboard Ejecutivo</h1>

        {/* KPI Cards */}
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-icon kpi-icon--blue">🚛</div>
            <div className="kpi-info">
              <span className="kpi-label">Camiones Activos</span>
              <span className="kpi-value">{camionesActivos.length}</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon kpi-icon--green">👥</div>
            <div className="kpi-info">
              <span className="kpi-label">Conductores Activos</span>
              <span className="kpi-value">{camiones.length}</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon kpi-icon--yellow">⏱️</div>
            <div className="kpi-info">
              <span className="kpi-label">Horas Trabajadas Hoy</span>
              <span className="kpi-value">94h</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-row">
          <div className="chart-card">
            <h3 className="chart-title">Km por Camión</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={kmData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="km" name="Kilómetros" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Productividad Conductores</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={productividadData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="horas" name="Horas Trabajadas" fill="#34d399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
