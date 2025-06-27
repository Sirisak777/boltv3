// ✅ server.js (หรือ server.ts ถ้าใช้ TypeScript)
import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFile = path.join(__dirname, 'users.json');

function loadUsers() {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile));
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

app.post('/register', (req, res) => {
  const { email, password, shopName, name } = req.body;
  const users = loadUsers();

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const newUser = {
    id: Date.now(),
    email,
    password,
    shopName,
    name,
  };

  users.push(newUser);
  saveUsers(users);

  const { password: _, ...userWithoutPassword } = newUser;
  res.json({ message: 'User registered successfully', user: userWithoutPassword });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // ✅ ส่งข้อมูลครบถ้วนกลับไป
  const { password: _, ...userWithoutPassword } = user;
  res.json({ message: 'Login successful', user: userWithoutPassword });
});

app.post('/change-password', (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required' });
  }

  const users = loadUsers();
  const userIndex = users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex].password = newPassword;
  saveUsers(users);

  res.json({ message: 'Password changed successfully' });
});

app.post('/update-profile', (req, res) => {
  const { id, name, shopName } = req.body;
  const users = loadUsers();

  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[index].name = name;
  users[index].shopName = shopName;
  saveUsers(users);

  const { password, ...userWithoutPassword } = users[index];
  if (!userWithoutPassword.email) {
    userWithoutPassword.email = users[index].email;
  }

  res.json({ message: 'Profile updated successfully', user: userWithoutPassword });
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
