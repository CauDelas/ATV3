const API_URL = 'http://10.0.0.166:3000/api/login';

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro no login:', error);
    return { success: false, message: 'Erro na conexão com o servidor' };
  }
};

export const fetchDataFromAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/data`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return { message: 'Erro ao buscar dados' };
  }
};
