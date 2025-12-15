import * as authService from '../services/auth.service.js';

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.json({ token: `Bearer ${token}` });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
