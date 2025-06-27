// ✅ server.js (หรือ server.ts ถ้าใช้ TypeScript)
import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFile = path.join(__dirname, 'users.json');

// 🚀 เสิร์ฟ React frontend build
const clientBuildPath = path.join(__dirname, '../dist'); // เปลี่ยนเป็น ../client/build ถ้าใช้ CRA
app.use(express.static(clientBuildPath));

if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, '[]');
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// 📦 API routes
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

// ✅ สำหรับทุก route ที่ไม่ใช่ API —> เสิร์ฟ index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
