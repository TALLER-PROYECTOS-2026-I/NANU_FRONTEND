const BASE_URL = "https://yoffr30es2.execute-api.us-east-2.amazonaws.com/Prod";

// Obtener lista de conductores
export const getConductors = async () => {
  try {
    const response = await fetch(`${BASE_URL}/conductors`);
    if (!response.ok) {
      throw new Error("Error al obtener conductores");
    }
    return response.json();
  } catch (error) {
    console.error("Error en getConductors:", error);
    return [];
  }
};

// Obtener lista de camiones
export const getTrucks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trucks`);
    if (!response.ok) {
      throw new Error("Error al obtener camiones");
    }
    return response.json();
  } catch (error) {
    console.error("Error en getTrucks:", error);
    return [];
  }
};

// Obtener contratos activos
export const getActiveContracts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/contracts/active`);
    if (!response.ok) {
      throw new Error("Error al obtener contratos");
    }
    return response.json();
  } catch (error) {
    console.error("Error en getActiveContracts:", error);
    return [];
  }
};

// Obtener jornadas recientes
export const getRecentShifts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/shifts/recent`);
    if (!response.ok) {
      throw new Error("Error al obtener jornadas recientes");
    }
    return response.json();
  } catch (error) {
    console.error("Error en getRecentShifts:", error);
    return [];
  }
};

// Iniciar turno
export const startShift = async (shiftData) => {
  try {
    const response = await fetch(`${BASE_URL}/shifts/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shiftData),
    });
    if (!response.ok) {
      throw new Error("Error al iniciar turno");
    }
    return response.json();
  } catch (error) {
    console.error("Error en startShift:", error);
    throw error;
  }
};