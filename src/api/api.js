const BASE_URL = "https://yoffr30es2.execute-api.us-east-2.amazonaws.com/Prod";

export const getItems = async () => {
  const response = await fetch(`${BASE_URL}/items`);
  return response.json();
};