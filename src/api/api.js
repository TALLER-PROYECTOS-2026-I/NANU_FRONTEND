const BASE_URL = "https://ujp4asesoj.execute-api.us-east-2.amazonaws.com/Prod";

export const getItems = async () => {
  const response = await fetch(`${BASE_URL}/items`);
  return response.json();
};

export const getCamiones = async () => {
  const response = await fetch(`${BASE_URL}/camiones`);
  return response.json();
};