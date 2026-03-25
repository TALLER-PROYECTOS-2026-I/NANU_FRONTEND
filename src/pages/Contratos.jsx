import { useNavigate, NavLink } from "react-router-dom";
import "./Contratos.css";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: "📊" },
  { label: "DayRecord", path: "/dayrecord", icon: "📋" },
  { label: "Camiones", path: "/camiones", icon: "🚛" },
  { label: "Contratos", path: "/contratos", icon: "📄" },
  { label: "GPS", path: "/gps", icon: "📍" },
];

function Contratos() {
  const navigate = useNavigate();

  const contratos = [
    { empresa: "Minera A", tipo: "Por viaje", tarifa: "$500" },
    { empresa: "Construct", tipo: "Por hora", tarifa: "$50" },
    { empresa: "Logística", tipo: "Por tonelada", tarifa: "$12" },
  ];

  const handleNuevo = () => {
    // placeholder: abrir modal o navegar a formulario
    alert("Crear nuevo contrato (pendiente implementar)");
  };

  return (
    <div className="dashboard-layout">
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
              className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={() => navigate("/")}>🚪 Cerrar Sesión</button>
      </aside>

      <main className="dashboard-main">
        <div className="contracts-header">
          <h1 className="dashboard-title">Contratos</h1>
          <button className="btn-new" onClick={handleNuevo}>+ Nuevo Contrato</button>
        </div>

        <div className="contracts-card">
          <table className="contracts-table">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Tipo de Servicio</th>
                <th>Tarifa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {contratos.map((c, i) => (
                <tr key={i}>
                  <td>{c.empresa}</td>
                  <td>{c.tipo}</td>
                  <td>{c.tarifa}</td>
                  <td className="actions">✏️ 🗑️</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Contratos;
