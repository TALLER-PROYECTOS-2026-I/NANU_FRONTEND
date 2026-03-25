import { useState } from "react";
import "./../App.css";

export default function Contratos() {
  const [contratos] = useState([
    {
      id: 1,
      empresa: "Minera A",
      servicio: "Por viaje",
      tarifa: "$500",
      estado: "Activo",
    },
    {
      id: 2,
      empresa: "Construct",
      servicio: "Por hora",
      tarifa: "$50",
      estado: "Pendiente",
    },
    {
      id: 3,
      empresa: "Logística",
      servicio: "Por tonelada",
      tarifa: "$12",
      estado: "Activo",
    },
  ]);

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="brand">
            <h2>NANU TECH</h2>
            <p>Gestión de Flota</p>
          </div>

          <nav className="menu">
            <a href="#" className="menu-item">
              <span>📊</span>
              <span>Dashboard</span>
            </a>
            <a href="#" className="menu-item">
              <span>🚛</span>
              <span>Camiones</span>
            </a>
            <a href="#" className="menu-item active">
              <span>📄</span>
              <span>Contratos</span>
            </a>
            <a href="#" className="menu-item">
              <span>📍</span>
              <span>GPS</span>
            </a>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button className="logout-btn">↪ Cerrar Sesión</button>
        </div>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <div>
            <p className="eyebrow">Prueba de concepto</p>
            <h1>Contratos</h1>
          </div>

          <button className="primary-btn">＋ Nuevo Contrato</button>
        </div>

        <section className="stats-grid">
          <div className="stat-card">
            <p>Total contratos</p>
            <h3>24</h3>
          </div>
          <div className="stat-card">
            <p>Activos</p>
            <h3>18</h3>
          </div>
          <div className="stat-card">
            <p>Pendientes</p>
            <h3>4</h3>
          </div>
          <div className="stat-card">
            <p>Finalizados</p>
            <h3>2</h3>
          </div>
        </section>

        <section className="table-card">
          <div className="table-header">
            <h2>Listado de contratos</h2>
            <input
              type="text"
              placeholder="Buscar contrato..."
              className="search-input"
            />
          </div>

          <div className="table-wrapper">
            <table className="contracts-table">
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Tipo de Servicio</th>
                  <th>Tarifa</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contratos.map((contrato) => (
                  <tr key={contrato.id}>
                    <td>{contrato.empresa}</td>
                    <td>{contrato.servicio}</td>
                    <td>{contrato.tarifa}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          contrato.estado === "Activo"
                            ? "active-badge"
                            : "pending-badge"
                        }`}
                      >
                        {contrato.estado}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="icon-btn edit-btn">✏️</button>
                        <button className="icon-btn delete-btn">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}