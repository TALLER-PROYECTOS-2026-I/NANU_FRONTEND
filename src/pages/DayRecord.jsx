import { useState, useEffect } from "react";
import {
  getConductors,
  getTrucks,
  getActiveContracts,
  getRecentShifts,
  startShift,
} from "../api/dayRecordApi";
import "./DayRecord.css";

export default function DayRecord() {
  const [conductors, setConductors] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [recentShifts, setRecentShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    conductor: "",
    truck: "",
    contract: "",
  });

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [conductorsData, trucksData, contractsData, shiftsData] =
          await Promise.all([
            getConductors(),
            getTrucks(),
            getActiveContracts(),
            getRecentShifts(),
          ]);

        setConductors(conductorsData || []);
        setTrucks(trucksData || []);
        setContracts(contractsData || []);
        
        // Si no hay datos de jornadas, usar datos de ejemplo
        if (shiftsData && shiftsData.length > 0) {
          setRecentShifts(shiftsData);
        } else {
          setRecentShifts([
            {
              id: 1,
              conductorName: "Carlos Mendoza",
              conductorId: "ABC-123",
              contractCode: "CTR-2026-001",
              date: "10/3/2026",
              duration: "8h 30m",
              status: "completed",
              statusLabel: "Duración",
              note: "Ruta normal, sin incidencias",
            },
            {
              id: 2,
              conductorName: "Luis Ramirez",
              conductorId: "DEF-456",
              contractCode: "CTR-2026-001",
              date: "10/3/2026",
              duration: "8h 30m",
              status: "completed",
              statusLabel: "Duración",
              note: "Ruta normal, sin incidencias",
            },
            {
              id: 3,
              conductorName: "Carlos Mendoza",
              conductorId: "ABC-223",
              contractCode: "CTR-2026-001",
              date: "9/3/2026",
              duration: "8h 0m",
              status: "completed",
              statusLabel: "Duración",
              note: "Entrega completada exitosamente",
            },
            {
              id: 4,
              conductorName: "Pedro González",
              conductorId: "MNO-345",
              contractCode: "CTR-2026-003",
              date: "9/3/2026",
              duration: "10h 0m",
              status: "completed",
              statusLabel: "Duración",
              note: "Entrega completada exitosamente",
            },
          ]);
        }
      } catch (err) {
        setError("Error al cargar los datos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validar que todos los campos estén completos
    if (!formData.conductor || !formData.truck || !formData.contract) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      setSubmitting(true);
      await startShift({
        conductorId: formData.conductor,
        truckId: formData.truck,
        contractId: formData.contract,
      });

      // Limpiar formulario
      setFormData({
        conductor: "",
        truck: "",
        contract: "",
      });

      // Recargar jornadas recientes
      const shiftsData = await getRecentShifts();
      setRecentShifts(shiftsData || []);

      alert("Turno iniciado correctamente");
    } catch (err) {
      setError("Error al iniciar el turno. Intenta nuevamente.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="day-record-container">
        <div className="loading">Cargando datos...</div>
      </div>
    );
  }

  return (
    <div className="day-record-container">
      <div className="day-record-header">
        <h1 className="day-record-title">Registrar Jornada</h1>
        <p className="day-record-subtitle">
          Sistema rápido para conductores · Objetivo: menos de 10 segundos
        </p>
      </div>

      <div className="day-record-content">
        {/* Formulario */}
        <div className="form-section">
          <h2 className="form-title">Iniciar Nueva Jornada</h2>
          <p className="form-description">
            Selecciona el contrato y presiona INICIAR TURNO
          </p>

          <form onSubmit={handleSubmit} className="shift-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="conductor" className="form-label">
                Conductor <span className="required">*</span>
              </label>
              <select
                id="conductor"
                name="conductor"
                value={formData.conductor}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Selecciona un conductor</option>
                {conductors.map((conductor) => (
                  <option key={conductor.id} value={conductor.id}>
                    {conductor.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="truck" className="form-label">
                Camión <span className="required">*</span>
              </label>
              <select
                id="truck"
                name="truck"
                value={formData.truck}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Selecciona un camión</option>
                {trucks.map((truck) => (
                  <option key={truck.id} value={truck.id}>
                    {truck.licensePlate} - {truck.model}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contract" className="form-label">
                Contrato Activo <span className="required">*</span>
              </label>
              <select
                id="contract"
                name="contract"
                value={formData.contract}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Selecciona un contrato</option>
                {contracts.map((contract) => (
                  <option key={contract.id} value={contract.id}>
                    {contract.code} - {contract.destination}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={submitting}
            >
              {submitting ? "Iniciando..." : "INICIAR TURNO"}
            </button>
          </form>

          <div className="info-box">
            <div className="info-icon">ℹ️</div>
            <div className="info-content">
              <p className="info-title">Tiempo de uso objetivo: menos de 10 segundos</p>
              <p className="info-text">
                El sistema registrará automáticamente la hora de inicio. Asegúrate
                de seleccionar el contrato correcto antes de iniciar.
              </p>
            </div>
          </div>
        </div>

        {/* Jornadas Recientes */}
        <div className="shifts-section">
          <h2 className="shifts-title">Jornadas Recientes</h2>
          <p className="shifts-subtitle">Últimas jornadas completadas</p>

          {recentShifts.length === 0 ? (
            <p className="no-shifts">No hay jornadas recientes</p>
          ) : (
            <div className="shifts-list">
              {recentShifts.map((shift) => (
                <div key={shift.id} className="shift-card">
                  <div className="shift-card-content">
                    <div className="shift-left">
                      <div className="conductor-checkbox">✓</div>
                      <div className="conductor-details">
                        <h3 className="conductor-name">{shift.conductorName}</h3>
                        <p className="conductor-id">{shift.conductorId}</p>
                        <p className="contract-code">{shift.contractCode} · {shift.date}</p>
                        <p className="shift-note">{shift.note}</p>
                      </div>
                    </div>
                    <div className="shift-right">
                      <p className="duration-value">{shift.duration}</p>
                      <p className="duration-label">{shift.statusLabel}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}