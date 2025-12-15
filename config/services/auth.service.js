import jwt from 'jsonwebtoken';

export async function login(username, password) {
  if (username === 'admin' && password === '1234') {
    return jwt.sign({ user: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
  throw new Error('Credenciales inválidas');
}
