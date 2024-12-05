const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === '12345') {
    res.json({ message: 'Login bem-sucedido!' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas!' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
