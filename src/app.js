// ⚠️ 교육용 예제: Snyk 시연을 위해 일부러 보안 취약점을 넣은 코드입니다. 실제 서비스에 사용하지 마세요.
const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const sqlite3 = require('sqlite3');

const app = express();
app.use(express.json());
const db = new sqlite3.Database(':memory:');
db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, password TEXT, role TEXT)');

// [취약점 1] 비밀 키를 코드에 직접 적음 (Hardcoded Secret)
const JWT_SECRET = 'coupang-super-secret-key-1234';

// 회원가입
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  // [취약점 2] 약한 해시(MD5)로 비밀번호 저장
  const hashed = crypto.createHash('md5').update(password).digest('hex');
  // [취약점 3] 사용자 입력을 SQL 문에 그대로 붙임 (SQL Injection)
  db.run("INSERT INTO users (email, password, role) VALUES ('" + email + "', '" + hashed + "', 'buyer')", (err) => {
    if (err) return res.status(500).send(err.message);
    res.send('가입 완료');
  });
});

// 로그인
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const hashed = crypto.createHash('md5').update(password).digest('hex');
  db.get("SELECT * FROM users WHERE email = '" + email + "' AND password = '" + hashed + "'", (err, user) => {
    if (!user) return res.status(401).send('로그인 실패');
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    res.json({ token });
  });
});

// 회원정보 수정
app.put('/me', (req, res) => {
  const user = { email: 'test@example.com', role: 'buyer' };
  // [취약점 4] 사용자 입력을 그대로 병합 (Prototype Pollution 위험, 취약한 lodash 버전)
  _.merge(user, req.body);
  res.json(user);
});

app.listen(3000, () => console.log('http://localhost:3000'));
