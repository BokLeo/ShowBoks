// Express 모듈을 가져옵니다. Express는 Node.js를 위한 웹 프레임워크로, 서버를 쉽게 구축할 수 있게 해줍니다.
const express = require('express');

// MySQL 모듈을 가져옵니다. MySQL은 Node.js에서 MySQL 데이터베이스와 상호작용할 수 있게 해줍니다.
const mysql = require('mysql2');

// CORS 모듈을 가져옵니다. CORS는 다른 도메인에서 서버에 요청을 보낼 수 있게 해주는 미들웨어입니다.
const cors = require('cors');

// dotenv 패키지를 사용하여 환경 변수를 로드합니다.
require('dotenv').config(); 

// Express 애플리케이션을 생성합니다.
const app = express();

// 서버가 실행될 포트를 설정합니다.
const port = 5000 // 포트를 환경 변수에서 가져옵니다.

// 미들웨어를 사용합니다. CORS를 활성화하여 다른 도메인에서의 요청을 허용합니다.
app.use(cors());

// JSON 형식의 요청 본문을 파싱하기 위한 미들웨어를 사용합니다.
app.use(express.json());

/**
 * 
DB_HOST="localhost"
DB_USER="showboks"
DB_PASS="1234"
DB_NAME="main"
DB_PORT="3306"
 */
// MySQL 데이터베이스에 연결합니다.
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// MySQL 데이터베이스 연결을 시도합니다.
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define routes
app.get('/api/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  db.query('INSERT INTO items SET ?', newItem, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ id: results.insertId, ...newItem });
  });
});


// 서버가 지정된 포트에서 실행되도록 설정합니다.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});