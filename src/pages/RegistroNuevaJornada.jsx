import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import "./Dashboard.css";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: "📊" },
  { label: "Camiones", path: "/dashboard", icon: "🚛" },
  { label: "Contratos", path: "/dashboard", icon: "📄" },
  { label: "GPS", path: "/dashboard", icon: "📍" },
];

function RegistroNuevaJornada() {
  const navigate = useNavigate();

  const fechaActual = new Date().toLocaleDateString("es-PE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 🔥 DATA COMPLETA (SIMULANDO BACKEND)
  const [jornadas] = useState([
    {
      id: "JORN-001",
      fecha: "29/03/2026",
      conductor: "N/A",
      camion: "N/A",
      contrato: "N/A",
      horario: "02:26 p.m.",
      estado: "Activa",
      km: 0,
      observaciones: false,
    },
    {
      id: "JORN-002",
      fecha: "29/03/2026",
      conductor: "Juan Pérez",
      camion: "Volvo FH",
      contrato: "CTR-001",
      horario: "01:23 p.m.",
      estado: "Activa",
      km: 0,
      observaciones: true,
    },
    {
      id: "JORN-010",
      fecha: "28/03/2026",
      conductor: "Carlos Ruiz",
      camion: "Scania R500",
      contrato: "CTR-010",
      horario: "08:14 a.m. - 07:59 p.m.",
      estado: "Completada",
      km: 680,
      observaciones: true,
    },
  ]);

  // 🔥 FILTROS
  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [filtroObs, setFiltroObs] = useState("todas");

  // 🔥 CONTADORES
  const total = jornadas.length;
  const activas = jornadas.filter(j => j.estado === "Activa").length;
  const completadas = jornadas.filter(j => j.estado === "Completada").length;
  const conObs = jornadas.filter(j => j.observaciones).length;

  // 🔥 FILTRADO FINAL
  const jornadasFiltradas = jornadas.filter(j => {
    let estadoOk =
      filtroEstado === "todas" ||
      j.estado.toLowerCase() === filtroEstado;

    let obsOk =
      filtroObs === "todas" ||
      (filtroObs === "con" && j.observaciones) ||
      (filtroObs === "sin" && !j.observaciones);

    return estadoOk && obsOk;
  });

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">NANU TECH</h2>
          <span className="sidebar-subtitle">Gestión de Flota</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink key={item.label} to={item.path} className="sidebar-link">
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          <NavLink
            to="/RegistroNuevaJornada"
            className="sidebar-link active"
          >
            🕒 Registro Jornadas
          </NavLink>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          🚪 Cerrar Sesión
        </button>
      </aside>

      {/* MAIN */}
      <main className="dashboard-main">
        {/* HEADER */}
        <div className="header-row">
          <div>
            <h1 className="dashboard-title">Registro de Jornadas</h1>
            <span className="subtitle">{fechaActual}</span>
          </div>

          <button
  className="btn-primary"
  onClick={() => navigate("/RegistroJornada")}
>
  + Nueva Jornada
</button>
        </div>

        {/* KPI */}
        <div className="kpi-row-4">
          <div className="kpi-card">
            <span className="kpi-label">Total Jornadas</span>
            <div className="kpi-value">{total}</div>
          </div>

          <div className="kpi-card">
            <span className="kpi-label">Jornadas Activas</span>
            <div className="kpi-value">{activas}</div>
          </div>

          <div className="kpi-card">
            <span className="kpi-label">Completadas</span>
            <div className="kpi-value">{completadas}</div>
          </div>

          <div className="kpi-card">
            <span className="kpi-label">Con Observaciones</span>
            <div className="kpi-value">{conObs}</div>
          </div>
        </div>

        {/* TABLA */}
        <div className="table-card">
          <div className="table-header">
            <input
              className="search-input"
              placeholder="Buscar..."
            />

            {/* FILTRO ESTADO */}
            <div className="filters">
              <button
                className={filtroEstado === "todas" ? "active" : ""}
                onClick={() => setFiltroEstado("todas")}
              >
                Todas ({total})
              </button>

              <button
                className={filtroEstado === "activa" ? "active" : ""}
                onClick={() => setFiltroEstado("activa")}
              >
                Activas ({activas})
              </button>

              <button
                className={filtroEstado === "completada" ? "active" : ""}
                onClick={() => setFiltroEstado("completada")}
              >
                Completadas ({completadas})
              </button>
            </div>
          </div>

          {/* FILTRO OBSERVACIONES */}
          <div
  className="filters"
  style={{
    marginBottom: "10px",
    gap: "8px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%"
  }}
>
  <span>Filtrar por observaciones:</span>

  <button
    className={filtroObs === "todas" ? "active" : ""}
    onClick={() => setFiltroObs("todas")}
  >
    Todas
  </button>

  <button
    className={filtroObs === "con" ? "active" : ""}
    onClick={() => setFiltroObs("con")}
  >
    Con Observaciones ({conObs})
  </button>

  <button
    className={filtroObs === "sin" ? "active" : ""}
    onClick={() => setFiltroObs("sin")}
  >
    Sin Observaciones
  </button>
</div>

          <table className="table">
            <thead>
              <tr>
                <th>ID Jornada</th>
                <th>Fecha</th>
                <th>Conductor</th>
                <th>Camión</th>
                <th>Contrato</th>
                <th>Horario</th>
                <th>Kilómetros</th>
                <th>Estado</th>
                <th>Observ.</th>
              </tr>
            </thead>

            <tbody>
  {jornadasFiltradas.map((j) => (
    <tr key={j.id}>
      <td style={{ textAlign: "left" }}>{j.id}</td>
      <td style={{ textAlign: "left" }}>{j.fecha}</td>
      <td style={{ textAlign: "left" }}>{j.conductor}</td>
      <td style={{ textAlign: "left" }}>{j.camion}</td>
      <td style={{ textAlign: "left" }}>{j.contrato}</td>
      <td style={{ textAlign: "left" }}>{j.horario}</td>
      <td style={{ textAlign: "left" }}>{j.km} km</td>

      <td style={{ textAlign: "left" }}>
        <span
          className={`badge ${
            j.estado === "Activa" ? "active" : "done"
          }`}
        >
          {j.estado}
        </span>
      </td>

      <td style={{ textAlign: "left" }}>
        <span className={j.observaciones ? "obs-si" : "obs-no"}>
          {j.observaciones ? "Sí" : "No"}
        </span>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default RegistroNuevaJornada;